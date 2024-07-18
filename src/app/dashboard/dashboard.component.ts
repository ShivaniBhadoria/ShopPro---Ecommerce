import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../services/product-list-data.service';
import { Product } from '../models/product.model';
import * as d3 from 'd3';

interface CategoryDistribution {
  label: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  productData: Product[] = [];
  @ViewChild('pieChart') private pieChartContainer!: ElementRef;
  selectedOption: 'averageRatings' | 'averageReviewCount' = 'averageRatings';
  selectedOptionLabel = 'Average Ratings';
  isBrowser: boolean;
  isSelectOpen = false;

  constructor(
    private productService: ProductService,
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.productService.getProducts().subscribe(
        data => {
          this.productData = data.productDetails;
          this.drawChart();
          this.createPieChart();
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.productData.length > 0) {
      this.drawChart();
      this.createPieChart();
    }
  }

  private drawChart(): void {
    const processedData = this.processData(this.productData);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select('#brandAnalysisChart').selectAll('*').remove();

    const svg = d3.select('#brandAnalysisChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(processedData.map(d => d.brand))
      .range([0, width])
      .padding(0.1);

    let y: d3.ScaleLinear<number, number> | undefined;

    if (this.selectedOption === 'averageRatings') {
      y = d3.scaleLinear()
        .domain([0, d3.max(processedData, d => d.averageRating) ?? 0])
        .nice()
        .range([height, 0]);
    } else if (this.selectedOption === 'averageReviewCount') {
      y = d3.scaleLinear()
        .domain([0, d3.max(processedData, d => d.reviewCount) ?? 0])
        .nice()
        .range([height, 0]);
    }

    if (y) {
      const customColors = ['#3ABEF9', '#C65BCF', '#FF7777', '#77E4C8', '#FF7EE2', '#E9FF97', '#EF5A6F', '#88D66C', '#536493', '#EB9C35'];
      const colorScale = d3.scaleOrdinal()
      .domain(processedData.map(d => d.brand))
      .range(customColors);

      svg.selectAll('.bar')
        .data(processedData as any[], (d: any) => d.brand)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.brand) ?? 0)
        .attr('y', height)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', d => colorScale(d.brand) as string)
        .transition()
        .duration(1000)
        .attr('y', d => {
          if (this.selectedOption === 'averageRatings') {
            return y(d.averageRating)!;
          } else if (this.selectedOption === 'averageReviewCount') {
            return y(d.reviewCount)!;
          }
          return 0;
        })
        .attr('height', d => {
          if (this.selectedOption === 'averageRatings') {
            return height - y(d.averageRating)!;
          } else if (this.selectedOption === 'averageReviewCount') {
            return height - y(d.reviewCount)!;
          }
          return 0;
        });

      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));
    }
  }


  private processData(data: Product[]): { brand: string, averageRating: number, reviewCount: number }[] {
    const brandData: { [key: string]: { totalRatings: number, totalReviewCount: number, count: number } } = {};
  
    data.forEach(product => {
      if (!brandData[product.brand]) {
        brandData[product.brand] = { totalRatings: 0, totalReviewCount: 0, count: 0 };
      }
      brandData[product.brand].totalRatings += product.ratings;
      brandData[product.brand].totalReviewCount += product.reviewCount;
      brandData[product.brand].count++;
    });
  
    return Object.keys(brandData).map(brand => ({
      brand,
      averageRating: brandData[brand].totalRatings / brandData[brand].count,
      reviewCount: brandData[brand].totalReviewCount / brandData[brand].count
    }));
  }

  updateChart(): void {
    this.drawChart();
  }

  setSelectedOption(option: 'averageRatings' | 'averageReviewCount'): void {
    this.selectedOption = option;
    this.selectedOptionLabel = option === 'averageRatings' ? 'Average Ratings' : 'Average Review Count';
    this.updateChart();
  }

  toggleSelectMetric(isOpen: boolean): void{
    this.isSelectOpen = isOpen;
  }

  private createPieChart(): void {
    const element = this.pieChartContainer?.nativeElement;
    const data = this.getCategoryDistribution();

    const width = 800;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 50;

    const color = d3.scaleOrdinal<string>(d3.schemeCategory10);

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arc = d3.arc<any>()
      .innerRadius(0)
      .outerRadius(radius)
      .padAngle(0.03)
      .padRadius(100)
      .cornerRadius(8);

    const pie = d3.pie<CategoryDistribution>()
      .value((d: CategoryDistribution) => d.value)
      .sort(null);

      const path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc as any)
    .attr('fill', (d, i) => `url(#gradient${i})`)
    .attr('stroke', 'white')
    .attr('stroke-width', '6px')
    .on('mouseover', function(d, i) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', d3.arc<any>()
          .innerRadius(0)
          .outerRadius(radius + 20)
          .padAngle(0.03)
          .padRadius(100)
          .cornerRadius(8)
        );
    })
    .on('mouseout', function(d, i) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('d', arc as any);
    });

    // Gradient definitions
    data.forEach((_, i) => {
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', `gradient${i}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color(i.toString()))
      .attr('stop-opacity', 1);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', d3.rgb(color(i.toString())).darker(2).toString())
      .attr('stop-opacity', 1);
    });

    // Add lines and labels
    const labelRadius = radius * 1.2;
    const labelArc = d3.arc<any>()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);

    svg.selectAll('line')
      .data(pie(data))
      .enter()
      .append('line')
      .attr('x1', (d: any) => arc.centroid(d)[0])
      .attr('y1', (d: any) => arc.centroid(d)[1])
      .attr('x2', (d: any) => labelArc.centroid(d)[0])
      .attr('y2', (d: any) => labelArc.centroid(d)[1])
      .attr('stroke', 'black');

    svg.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', (d: any) => {
        const [x, y] = labelArc.centroid(d);
        const sign = (x > 0) ? 1 : -1;
        return `translate(${x + sign * 10},${y})`;
      })
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => {
        const [x, _] = labelArc.centroid(d);
        return (x > 0) ? 'start' : 'end';
      })
      .text((d: any) => `${d.data.label}: ${d.data.value.toFixed(1)}%`)
      .style('font-size', '12px')
      .style('fill', 'black');
  }

  private getCategoryDistribution(): CategoryDistribution[] {
    const categoryCount: { [key: string]: number } = this.productData.reduce((acc: { [key: string]: number }, product: Product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    const totalProducts = this.productData.length;

    return Object.keys(categoryCount).map(category => ({
      label: category,
      value: (categoryCount[category] / totalProducts * 100)
    }));
  }

}

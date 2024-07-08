import { Component, OnInit } from '@angular/core';
import { FILTER_DATA } from './filter-data';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product-list-data.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrl: './shop-products.component.scss'
})
export class ShopProductsComponent implements OnInit {

  filterData = FILTER_DATA;
  isSortDropdownOpen: boolean = false;
  productData: Product[] = [];
  updatedProductData: Product[] = [];
  sortOptions: { id: string, text: string }[] = [
    { id: 'new', text: "What's New" },
    { id: 'priceLowToHigh', text: 'Price: Low to High' },
    { id: 'priceHighToLow', text: 'Price: High to Low' },
    { id: 'discount', text: 'Discount' },
    { id: 'popularity', text: 'Popularity' },
    { id: 'ratings', text: 'Ratings' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.productData = data.productDetails.map((product: any) => {
        return {
          ...product,
          discountedPrice: this.calculateDiscountedPrice(product.price, product.discount)
        };
      });
      this.updatedProductData = [...this.productData];
    });
  }

  toggleSortingDropdown(isOpen: boolean): void{
    this.isSortDropdownOpen = isOpen;
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    const discountedPrice = price - (price * discount / 100);
    return discountedPrice;
  }

  sortItems(event: Event, id: string): void {
    event.preventDefault();
  
    switch (id) {
      case 'priceLowToHigh':
        this.productData.sort((a: { discountedPrice: number; }, b: { discountedPrice: number; }) => a.discountedPrice - b.discountedPrice);
        break;
      case 'priceHighToLow':
        this.productData.sort((a: { discountedPrice: number; }, b: { discountedPrice: number; }) => b.discountedPrice - a.discountedPrice);
        break;
      case 'ratings':
        this.productData.sort((a: { ratings: number; }, b: { ratings: number; }) => b.ratings - a.ratings);
        break;
      case 'popularity':
        this.productData.sort((a: { popularity: number; }, b: { popularity: number; }) => b.popularity - a.popularity);
        break;
      case 'discount':
        this.productData.sort((a: { discount: number; }, b: { discount: number; }) => b.discount - a.discount);
        break;
      default:
        this.productData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
        break;
    }
  }

  onProductDataChange(updatedProductData: any[]) {
    console.log(updatedProductData);
    this.updatedProductData = JSON.parse(JSON.stringify(updatedProductData));
  }
}

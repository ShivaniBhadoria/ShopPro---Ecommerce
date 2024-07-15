import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Input()filterData: any[] = [];
  @Input()productData: any[] = [];
  @Output() productDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() filtersAppliedChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() source: string = "";
  selectedOptions: any[] = []; 
  applyLabel = 'APPLY FILTERS';
  filteredProductsSet: Set<any> = new Set();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productData'] && changes['productData'].currentValue?.length > 0 && this.source) {
      this.applySourceFilter();
    }
  }

  applySourceFilter(): void {
    const sourceMappings: { [key: string]: { option: string, filterType: string } } = {
      'shop-women': { option: "Women", filterType: "gender" },
      'shop-men': { option: "Men", filterType: "gender" },
      'shop-accessories': { option: "Accessories", filterType: "category" },
      'shoes-offer': { option: "Shoes", filterType: "category" },
      'makeup-offer': { option: "Makeup", filterType: "category" },
      'handbags-offer': { option: "Accessories", filterType: "category" },
      'watches-offer': { option: "Accessories", filterType: "category" }//multiple filters
    };
  
    const mapping = sourceMappings[this.source];
    if (mapping) {
      const selectedOption = {
        option: mapping.option,
        filterType: mapping.filterType,
        isChecked: { checked: true }
      };
      this.toggleFilterOptionSelection(selectedOption.option, selectedOption.filterType, selectedOption.isChecked);
    }
  }

  isFilterSelected(selectedOption: any): boolean {
    return this.selectedOptions.some(option => 
      option.filterType === selectedOption.filterType && option.value === selectedOption.value
    );
  }

  toggleFilterOptionSelection(option: string, filterType: string, event:any): void {
    const selectedOption = { filterType: filterType, value: option, isChecked: event.checked };
    if (this.isFilterSelected(selectedOption)) {
      this.selectedOptions = this.selectedOptions.filter(item => 
        item.filterType !== selectedOption.filterType || item.value !== selectedOption.value
      );
    } else {
      this.selectedOptions.push(selectedOption);
    }
    this.filterProducts(selectedOption);
    this.applyLabel = this.selectedOptions.length > 0 ? 'CLEAR FILTERS' : 'APPLY FILTERS';
  }

  filterProducts(selectedOption: any) {
    let filteredProducts = this.productData;

    const filterTypes = {//Debug this 
      'gender': (product: { gender: any; }) => product.gender === selectedOption.value,
      'category': (product: { category: any; }) => product.category === selectedOption.value,
      'brand': (product: { brand: any; }) => product.brand === selectedOption.value,
      'material': (product: { material: any; }) => product.material === selectedOption.value,
      'colorsAvailable': (product: { colorsAvailable: string | any[]; }) => product.colorsAvailable.includes(selectedOption.value),
      'sizeAvailable': (product: { sizeAvailable: string | any[]; }) => product.sizeAvailable.includes(selectedOption.value),
      'occasion': (product: { occasion: string | any[]; }) => product.occasion.includes(selectedOption.value),
      'price': (product: { price: number; }) => {
        const priceRange = selectedOption.value.split('-');
        const minPrice = parseInt(priceRange[0], 10);
        const maxPrice = parseInt(priceRange[1], 10);
        return product.price >= minPrice && product.price < maxPrice;
      },
      'discount': (product: { discount: number; }) => product.discount >= parseInt(selectedOption.value, 10),
      'ratings': (product: { ratings: number; }) => product.ratings >= parseFloat(selectedOption.value),
    };
    
    const filterFunction = filterTypes[selectedOption.filterType as keyof typeof filterTypes];
    if (filterFunction) {
      if (selectedOption.isChecked) {
        const tempFilteredProducts = filteredProducts.filter(filterFunction);
        tempFilteredProducts.forEach(product => this.filteredProductsSet.add(product));

      } else {//to handle if a product matches two filters and one selected and other is removed?
        const tempFilteredProducts = filteredProducts.filter(filterFunction);
        tempFilteredProducts.forEach(product => this.filteredProductsSet.delete(product));//Removes all filtered products (remove all which doesn't match any active filter)
      }
    }

    if(this.selectedOptions.length === 0) {
      this.productDataChange.emit(this.productData);
    } else {
      const checkedValues = this.selectedOptions
      .filter(opt => opt.isChecked)
      .map(opt => opt.value);

      this.productDataChange.emit(Array.from(this.filteredProductsSet));
      this.filtersAppliedChange.emit(checkedValues);
    }
  }
  

  clearFilters() {
    this.selectedOptions = [];
    this.filteredProductsSet.clear();
    this.applyLabel = 'APPLY FILTERS';
    this.productDataChange.emit(this.productData);
  }

}



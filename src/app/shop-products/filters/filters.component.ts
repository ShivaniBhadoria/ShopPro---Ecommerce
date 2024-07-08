import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Input()filterData: any[] = [];
  @Input()productData: any[] = [];
  @Output() productDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  selectedOptions: any[] = []; 
  applyLabel = 'APPLY FILTERS';
  filteredproductsSet: Set<any> = new Set();

  constructor() {}

  ngOnInit(): void {
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

  // filterProducts(selectedOption: any) {
  //   let filteredProducts = this.productData;

  //   if(selectedOption.isChecked){
  //     switch (selectedOption.filterType) {
  //       case 'gender':
  //         filteredProducts = filteredProducts.filter(product => product.gender === selectedOption.value);
  //         break;
  //       case 'category':
  //         filteredProducts = filteredProducts.filter(product => product.category === selectedOption.value);
  //         break;
  //       case 'brand':
  //         filteredProducts = filteredProducts.filter(product => product.brand === selectedOption.value);
  //         break;
  //       case 'material':
  //         filteredProducts = filteredProducts.filter(product => product.material === selectedOption.value);
  //         break;
  //       case 'colorsAvailable':
  //         filteredProducts = filteredProducts.filter(product => product.colorsAvailable.includes(selectedOption.value));
  //         break;
  //       case 'sizeAvailable':
  //         filteredProducts = filteredProducts.filter(product => product.sizeAvailable.includes(selectedOption.value));
  //         break;
  //       case 'occasion':
  //         filteredProducts = filteredProducts.filter(product => product.occasion.includes(selectedOption.value));
  //       break;
  //       case 'price':
  //         if(selectedOption.value === "0-10k"){
  //           filteredProducts = filteredProducts.filter(product => product.price >= 0 && product.price < 10000);
  //         } else if(selectedOption.value === "10k-20k") {
  //           filteredProducts = filteredProducts.filter(product => product.price >= 10000 && product.price < 20000);
  //         } else if(selectedOption.value === "20k-30k") {
  //           filteredProducts = filteredProducts.filter(product => product.price >= 20000 && product.price < 30000);
  //         } else if(selectedOption.value === "30k-40k") {
  //           filteredProducts = filteredProducts.filter(product => product.price >= 30000 && product.price < 40000);
  //         } else if(selectedOption.value === "40k-50k") {
  //           filteredProducts = filteredProducts.filter(product => product.price >= 40000 && product.price < 50000);
  //         } else {
  //           filteredProducts = filteredProducts.filter(product => product.price > 50000);
  //         }
  //       break;
  //       case 'discount':
  //         if(selectedOption.value === "10% and above"){
  //           filteredProducts = filteredProducts.filter(product => product.discount >= 10);
  //         } else if(selectedOption.value === "20% and above") {
  //           filteredProducts = filteredProducts.filter(product => product.discount >= 20);
  //         } else if(selectedOption.value === "30% and above") {
  //           filteredProducts = filteredProducts.filter(product => product.discount >= 30);
  //         } else if(selectedOption.value === "40% and above") {
  //           filteredProducts = filteredProducts.filter(product => product.discount >= 40);
  //         } else {
  //           filteredProducts = filteredProducts.filter(product => product.discount >= 50);
  //         }
  //       break;
  //       case 'ratings':
  //         if(selectedOption.value === "1 star and above"){
  //           filteredProducts = filteredProducts.filter(product => product.ratings >= 1);
  //         } else if(selectedOption.value === "2 star and above") {
  //           filteredProducts = filteredProducts.filter(product => product.ratings >= 2);
  //         } else if(selectedOption.value === "3 star and above") {
  //           filteredProducts = filteredProducts.filter(product => product.ratings >= 3);
  //         } else if(selectedOption.value === "4 star and above") {
  //           filteredProducts = filteredProducts.filter(product => product.ratings >= 4);
  //         } else {
  //           filteredProducts = filteredProducts.filter(product => product.ratings >= 4.5);
  //         }
  //       break;
  //     }
  //   }

  // console.log(filteredProducts);

  // }

  filterProducts(selectedOption: any) {
     let filteredProducts = this.productData;

    const filterTypes = {
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
          tempFilteredProducts.forEach(product => this.filteredproductsSet.add(product));
        } else {
          const tempFilteredProducts = filteredProducts.filter(filterFunction);
          tempFilteredProducts.forEach(product => this.filteredproductsSet.delete(product));
        }
      }


    // console.log('filteredSet', this.filteredproductsSet);
    this.productDataChange.emit(Array.from(this.filteredproductsSet));
  }
  

  clearFilters() {
    this.selectedOptions = [];
    this.filteredproductsSet.clear();
    this.applyLabel = 'APPLY FILTERS';
    this.productDataChange.emit(this.productData);
  }

}



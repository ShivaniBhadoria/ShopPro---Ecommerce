import { Component } from '@angular/core';
import { FILTER_DATA } from './filter-data';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrl: './shop-products.component.scss'
})
export class ShopProductsComponent {

  filterData = FILTER_DATA;
  isSortDropdownOpen: boolean = false;

  constructor() {}


  openSortingDropdown() {
    this.isSortDropdownOpen = true;
  }

  closeSortingDropdown() {
    this.isSortDropdownOpen = false;
  }

}

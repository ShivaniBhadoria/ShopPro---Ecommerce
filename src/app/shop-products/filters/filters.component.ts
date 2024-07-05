import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Input()filterData: any[] = [];
  selectedOptions: any[] = []; 
  applyLabel = 'APPLY FILTER';

  constructor() {}

  isFilterSelected(option: any): boolean {
    return this.selectedOptions.includes(option);
  }

  toggleFilterOptionSelection(option: any): void {
    if (this.isFilterSelected(option)) {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    } else {
      this.selectedOptions.push(option);
    }

    this.applyLabel = this.selectedOptions.length > 0 ? 'CLEAR FILTER' : 'APPLY FILTER';
  }

  clearFilters() {
    this.selectedOptions = [];
    this.applyLabel = 'APPLY FILTER'; 
  }

}



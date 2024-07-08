import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product-list-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input()productData: any[] = [];

  constructor() {}

  ngOnInit(): void {
   
  }

}

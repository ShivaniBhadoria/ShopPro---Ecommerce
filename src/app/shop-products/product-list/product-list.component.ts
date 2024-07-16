import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() productData: any[] = [];
  @Output() addToCartClicked = new EventEmitter<Product>();
  showAlert = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
 
  }

  toggleWishlist(product: any, isAdded: boolean) {
    product.isAddedToWishlist = isAdded;
  }

  addToCart(event:any, product:any) {
    if(!product.isAddedToCart){
      product.isAddedToCart = true;
      product.addToCartLabel = 'Go To Cart';
      this.addToCartClicked.emit(product);
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 1000);
    } else {
      this.router.navigate(['/cart']);
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

}

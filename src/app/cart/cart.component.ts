import { Component } from '@angular/core';
import { ProductService } from '../services/product-list-data.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItemCount = 0;
  cartItems: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(): void {
    this.productService.getCartDetails().subscribe(
      data => {
        this.cartItems = data.cartItems.productsInCart;
        this.cartItemCount = data.cartItems.cartItemCount;
      },
      error => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    const discountedPrice = price - (price * discount / 100);
    return discountedPrice;
  }
}

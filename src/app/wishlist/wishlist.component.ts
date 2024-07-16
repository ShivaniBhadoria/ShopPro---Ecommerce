import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product-list-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  productData: Product[] = [];
  wishlistProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.productData = data.productDetails.map(product => {
        return { 
          ...product, 
          addToCartLabel: product.isAddedToCart ? 'Go To Cart' : 'Move To Cart',
          discountedPrice: this.calculateDiscountedPrice(product.price, product.discount)
         };
      });
      this.filterWishlistProducts();
    });
  }

  filterWishlistProducts(): void {
    this.wishlistProducts = this.productData.filter(product => product.isAddedToWishlist);
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    const discountedPrice = price - (price * discount / 100);
    return Math.floor(discountedPrice);
  }
}

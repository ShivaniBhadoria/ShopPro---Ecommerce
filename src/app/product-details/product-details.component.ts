import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product-list-data.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productData: Product[] = [];
  product: any;
  rating: number = 0;
  fullStars: number[] = [];
  halfStar: boolean = false;
  emptyStars: number[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id !== null){
        this.productService.getProducts().subscribe(data => {
          this.productData = data.productDetails;
          this.getProductDetails(id);
        });
      }
    });
  }

  getProductDetails(id:any){
    this.product = this.productData.find(product => product.id === +id);
    this.product.discountedPrice = this.calculateDiscountedPrice(this.product.price, this.product.discount);
    this.rating = this.product.ratings;
    this.calculateStars();
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    const discountedPrice = price - (price * discount / 100);
    return discountedPrice;
  }

  calculateStars(): void {
    const integerPart = Math.floor(this.rating);
    const fractionalPart = this.rating - integerPart;

    this.fullStars = Array(integerPart).fill(0);

    if (fractionalPart >= 0.5) {
      this.halfStar = true;
    }

    const totalStars = this.halfStar ? integerPart + 1 : integerPart;
    this.emptyStars = Array(5 - totalStars).fill(0);
  }
    
}

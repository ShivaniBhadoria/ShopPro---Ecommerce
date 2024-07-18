import { Component, SimpleChanges } from '@angular/core';
import { ProductService } from '../services/product-list-data.service';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart-details-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItemCount = 0;
  cartItems: Product[] = [];
  minQuantity: number = 1;
  maxQuantity: number = 100;

  totalMRP: number = 0;
  discountAmount: number = 0;
  shippingFee: number = 0;
  totalAmount: number = 0;
  orderPlacedLabel = "PLACE ORDER";

  constructor(private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemProducts$.subscribe(data => {
      if (data && data.length > 0) {
        this.cartItems = data.map((product: any) => ({
          ...product,
          discountedPrice: this.calculateDiscountedPrice(product.price, product.discount),
          iconColor: product.colorsAvailable[0],
          selectedSize: product.sizeAvailable[0],
          quantity: 1,
          originalPrice: product.price,
          isSizeDropdownOpen: false
        }));
        this.updateSummary();
      } else {
        this.getCartDetails();
      }
    });
    this.productService.cartItemCount$.subscribe(data => {
      this.cartItemCount = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartItems']) {
      if(this.cartItems && this.cartItems.length>0){
        this.updateSummary();
      }
    }
  }

  getCartDetails(): void {
    this.productService.getCartDetails().subscribe(data => {
        this.cartItemCount = data.cartItems.cartItemCount;
        this.cartItems = data.cartItems.productsInCart;
        if (this.cartItems && this.cartItems.length > 0) {
          this.cartItems = this.cartItems.map((product: any) => {
            return {
              ...product,
              discountedPrice: this.calculateDiscountedPrice(product.price, product.discount),
              iconColor: product.colorsAvailable[0],
              selectedSize: product.sizeAvailable[0],
              quantity: 1,
              originalPrice: product.price,
              isSizeDropdownOpen: false
            };
          });
          this.updateSummary();
        }
      },
      error => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    const discountedPrice = price - (price * discount / 100);
    return Math.floor(discountedPrice);
  }

  toggleSizingDropdown(isOpen: boolean, cartItem: Product): void{
    cartItem.isSizeDropdownOpen = isOpen;
  }

  selectSize(size: string, cartItem: Product): void {
    cartItem.selectedSize = size;
    cartItem.isSizeDropdownOpen = false;
    console.log(cartItem.selectedSize);
  }

  updateCartItemPrice(cartItem: Product) {
    cartItem.discountedPrice = this.calculateDiscountedPrice(cartItem.originalPrice, cartItem.discount) * cartItem.quantity;
    cartItem.price = cartItem.originalPrice * cartItem.quantity;
    this.updateSummary();
  }

  decreaseQuantity(cartItem: Product): void {
    if (cartItem.quantity > this.minQuantity) {
      cartItem.quantity--;
      this.updateCartItemPrice(cartItem);
    }
  }

  increaseQuantity(cartItem: Product): void {
    if (cartItem.quantity < this.maxQuantity) {
      cartItem.quantity++;
      this.updateCartItemPrice(cartItem);
    }
  }

  updateQuantity(cartItem: Product, newQuantity: number): void {//for input field
    if (newQuantity < this.minQuantity) {
      cartItem.quantity = this.minQuantity;
    } else if (newQuantity > this.maxQuantity) {
      cartItem.quantity = this.maxQuantity;
    } else {
      cartItem.quantity = newQuantity;
    }
  }

  calculateTotalMRP(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  calculateDiscountAmount(): number {
    return this.calculateTotalMRP() - this.calculateDiscountedAmount();
  }

  calculateShippingFee(): number {
    return this.calculateTotalMRP() > 20000 ? 0 : 500;
  }

  calculateDiscountedAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.discountedPrice, 0);
  }

  calculateTotalAmount(): number {
    return this.calculateDiscountedAmount() + this.shippingFee;
  }

  updateSummary(): void {
    this.totalMRP = this.calculateTotalMRP();
    this.discountAmount = this.calculateDiscountAmount();
    this.shippingFee = this.calculateShippingFee();
    this.totalAmount = this.calculateTotalAmount();
  }

  removeCartItem(cartItem: Product): void {
    const index = this.cartItems.indexOf(cartItem);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemCount--;
      this.productService.sendCartItemCount(this.cartItemCount);
      this.updateSummary();
    }
  }

  toggleWishlist(cartItem: any, isAdded: boolean) {
    cartItem.isAddedToWishlist = isAdded;
  }

  orderPlaced() {
    this.orderPlacedLabel = "ORDER PLACED!";
  }
}

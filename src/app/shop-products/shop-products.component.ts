import { Component, OnInit } from '@angular/core';
import { FILTER_DATA } from './filter-data';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product-list-data.service';
import { CartService } from '../services/cart-details-data.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrl: './shop-products.component.scss'
})
export class ShopProductsComponent implements OnInit {

  filterData = FILTER_DATA;
  isSortDropdownOpen: boolean = false;
  productData: Product[] = [];
  updatedProductData: Product[] = [];
  sortedByText: string = "Default";
  isLoading = false;
  source: string = "";
  filterApplied: any [] = [];
  cartItemCount: number = 0;

  sortOptions: { id: string, text: string }[] = [
    { id: 'new', text: "What's New" },
    { id: 'priceLowToHigh', text: 'Price: Low to High' },
    { id: 'priceHighToLow', text: 'Price: High to Low' },
    { id: 'discount', text: 'Discount' },
    { id: 'popularity', text: 'Popularity' },
    { id: 'ratings', text: 'Ratings' },
    { id: 'default', text: 'Default' }
  ];

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.productService.getProducts().subscribe(data => {
      this.productData = data.productDetails.map((product: any) => {
        return {
          ...product,
          addToCartLabel: product.isAddedToCart ? 'Go To Cart' : 'Add To Cart',
          discountedPrice: this.calculateDiscountedPrice(product.price, product.discount)
        };
      });
      this.updatedProductData = [...this.productData];
      //Get queryParams from source
      this.route.queryParams.subscribe(params => {
        this.source = params['source'];
      });
      this.isLoading = false;
    },
    error => {
      this.isLoading = false;
      console.error('Error fetching product details:', error);
    });
  }

  toggleSortingDropdown(isOpen: boolean): void{
    this.isSortDropdownOpen = isOpen;
  }

  calculateDiscountedPrice(price: number, discount: number): number {
    const discountedPrice = price - (price * discount / 100);
    return Math.floor(discountedPrice);
  }

  sortItems(event: Event | null = null, id: string = 'default', text:string = 'Default'): void {
    if (event) {
      event.preventDefault();
    }
    const sortCriteria: { [key: string]: (a: any, b: any) => number } = {
      'new': (a, b) => a.reviewCount - b.reviewCount,
      'priceLowToHigh': (a, b) => a.discountedPrice - b.discountedPrice,
      'priceHighToLow': (a, b) => b.discountedPrice - a.discountedPrice,
      'ratings': (a, b) => b.ratings - a.ratings,
      'popularity': (a, b) => b.popularity - a.popularity,
      'discount': (a, b) => b.discount - a.discount,
      'default': (a, b) => a.id - b.id,
    };
  
    const sortFunction = sortCriteria[id] || sortCriteria['default'];
    if(this.updatedProductData.length > 0){
      this.updatedProductData.sort(sortFunction);
      this.productService.setSortId(id, text);
      this.sortedByText = text;
    } else {
      this.sortedByText = '';
    }
  }

  onProductDataChange(updatedProductData: any[]) {
    this.updatedProductData = JSON.parse(JSON.stringify(updatedProductData));
    this.sortItems(null, this.productService?.getSortId().sortId, this.productService?.getSortId().sortText);
  }

  onFiltersAppliedChange(checkedValues: any[]) {
    this.filterApplied = checkedValues;
  }

  updateProductData(product: Product): void {
    const index = this.productData.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.productData[index] = { ...product };
    }
    this.cartItemCount = this.productData.filter(product => product.isAddedToCart).length;
    this.productService.sendCartItemCount(this.cartItemCount);
    const cartProducts = this.productData.filter(p => p.isAddedToCart) || [];
    this.cartService.sendCartProducts(cartProducts);
  }
}

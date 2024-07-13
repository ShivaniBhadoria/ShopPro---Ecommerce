import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsPath = 'assets/data/products.json';
  private cartPath = 'assets/data/cart.json';
  private cartItemCountSubject = new BehaviorSubject<any>(null);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  public sortingDetails = {
    sortId: 'default',
    sortText: 'Default'
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ productDetails: Product[] }> {
    return this.http.get<{ productDetails: Product[] }>(this.productsPath);
  }

  getCartDetails(): Observable<{ cartItems: { cartItemCount: number, productsInCart: Product[] } }> {
    return this.http.get<{ cartItems: { cartItemCount: number, productsInCart: Product[] } }>(this.cartPath);
  }

  setSortId(sortId:string, sortText:string) {
    this.sortingDetails = {
      sortId: sortId,
      sortText: sortText
    };
  }

  getSortId() {
    return this.sortingDetails;
  }

  sendCartItemCount(data: any): void {
    this.cartItemCountSubject.next(data);
  }
}

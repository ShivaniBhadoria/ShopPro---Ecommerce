import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private cartItemCountSubject = new BehaviorSubject<any>(null);
    cartItemCount$ = this.cartItemCountSubject.asObservable();

    private cartProductsSubject = new BehaviorSubject<any>(null);
    cartItemProducts$ = this.cartProductsSubject.asObservable();

    constructor(private http: HttpClient) {}


    sendCartItemCount(data: any): void {
        this.cartItemCountSubject.next(data);
    }

    sendCartProducts(data: any): void{
        this.cartProductsSubject.next(data);
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private jsonURL = 'assets/data/products.json';
  public sortingDetails = {
    sortId: 'default',
    sortText: 'Default'
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ productDetails: Product[] }> {
    return this.http.get<{ productDetails: Product[] }>(this.jsonURL);
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
}

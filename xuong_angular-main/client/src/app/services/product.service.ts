import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddProductForm, Product, ProductForm } from '../../types/Products';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private searchValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/products';

  constructor() { }
  // getAllProduct
  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // getDetailProduct
  getDetailProductById(id: number | string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // createProduct
  createProduct(product: any) {
    return this.http.post<any>(this.apiUrl, product);
  }

  getLastProductId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/lastProductId`);
  }

  //updateProduct
  updateProductById(id: number | string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  //delete product
  deleteProductById(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



  setSearchValue(value: string): void {
    this.searchValueSubject.next(value);
  }

  getSearchValue(): Observable<string> {
    return this.searchValueSubject.asObservable();
  }

}

import { inject, Injectable } from '@angular/core';
import { Category } from '../../types/Category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiAdminUrl = 'http://localhost:3000/categories'; // khai bao apiUrl
  http = inject(HttpClient); // inject bien http

  constructor() { }

  getCategoryListAdmin() {
    return this.http.get<Category[]>(this.apiAdminUrl);
  }



}

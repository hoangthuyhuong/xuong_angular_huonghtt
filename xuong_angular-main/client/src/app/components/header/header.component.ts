import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types/Products';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs/operators'; // Import the map operator
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  filterValue: string = ''; // Khai báo thuộc tính filterValue ở đây

  constructor(private searchService: ProductService) { }

  updateSearch(value: string): void {
    this.searchService.setSearchValue(value);
  }

}

import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../../types/Products';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, NgFor, NgToastModule, FormsModule, NgxPaginationModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProductListComponent implements OnInit {
  originalProducts: Product[] = [];
  products: Product[] = [];
  categories: any[] = [];
  filterValue: string = '';
  page: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toast: NgToastService
  ) { }

  categoryList: Category[] = [];

  ngOnInit(): void {
    this.loadProducts();
    this.categoryService.getCategoryListAdmin().subscribe({
      next: (categories) => (this.categoryList = categories),
      error: (err) => console.error('Error fetching categories:', err),
    });

  }
  loadCategories() {
    this.categoryService.getCategoryListAdmin().subscribe((data) => {
      this.categories = data;
    }, error => {
      console.error('Error loading categories', error);
    });
  }
  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.originalProducts = data;
        this.calculateTotalPages();
        this.filter(); // Apply filter after loading products
      },
      error: (error) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'API Not Found',
          duration: 5000,
          sticky: true,
        });
      },
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.originalProducts.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  filter() {
    const filteredProducts = this.originalProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        p.description.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        p.category.toLowerCase().includes(this.filterValue.toLowerCase())
    );
    this.totalPages = Math.ceil(filteredProducts.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.products = filteredProducts.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );

    // Kiểm tra xem trang hiện tại có sản phẩm không
    if (this.products.length === 0 && this.totalPages > 0) {
      // Nếu không có sản phẩm và có ít nhất một trang, chuyển đến trang đầu tiên chứa sản phẩm
      for (let i = 1; i <= this.totalPages; i++) {
        const productsInPage = filteredProducts.slice(
          (i - 1) * this.pageSize,
          i * this.pageSize
        );
        if (productsInPage.length > 0) {
          this.page = i;
          this.products = productsInPage;
          return;
        }
      }
    }
  }

  onSearch() {
    this.filter();
  }

  set filterValueInput(value: string) {
    this.filterValue = value;
    this.page = 1;
    this.filter();
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.filter();
    }
  }

  handleDeleteProduct(id: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn không?',
      text: 'Bạn không thể khôi phục hành động này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Không!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id).subscribe({
          next: () => {
            this.originalProducts = this.originalProducts.filter(
              (product) => product._id !== id
            );
            this.filter(); // Reapply filter after deleting
            Swal.fire({
              title: 'Đã xóa!',
              text: 'Sản phẩm của bạn đã bị xóa.',
              timer: 1000,
              timerProgressBar: true,
            });
          },
          error: (error) => {
            Swal.fire('Lỗi!', 'Có lỗi xảy ra trong khi xóa sản phẩm.', 'error');
            console.error(error);
          },
        });
      }
    });
  }


}

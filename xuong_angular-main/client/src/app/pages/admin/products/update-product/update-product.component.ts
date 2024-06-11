import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductAdd } from '../../../../../types/Products';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../../types/Category';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule, CommonModule, NgToastModule, NgxPaginationModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  loading: boolean = false;
  product: Product | undefined;
  router = inject(Router);
  productId!: string;
  productService = inject(ProductService);

  categoryList: Category[] = [];
  minDate = new Date().toISOString().slice(0, 16);
  updateProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(true),
    bidTime: new FormControl(''),
    startAt: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    // Fetch product details by ID from route
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getDetailProductById(param['id']).subscribe({
        next: (data) => {
          const now = new Date(data.startAt);
          now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
          const startAt = now.toISOString().slice(0, 16);
          this.updateProductForm.patchValue({ ...data, startAt: startAt });
        },
        error: (error) => {
          // Show error notification
          console.error(error);
        },
      });
    });

    // Fetch categories
    this.categoryService.getCategoryListAdmin().subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
        // Show error notification
        console.error('Error fetching categories:', error);
      },
    });
  }

  handleUpdateProduct() {
    this.productService.updateProductById(this.productId, this.updateProductForm.value).subscribe({
      next: () => {
        // Show success notification and navigate after delay
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Cập nhật sản phẩm thành công',
          duration: 5000, // Duration of the toast notification
          sticky: false,
        });

        setTimeout(() => {
          this.router.navigate(['/admin/products/list']);
        }, 2000); // Delay navigation to match the toast duration
      },
      error: (error) => {
        // Show error notification
        console.error('Error updating product:', error.message);
        this.toast.error({
          detail: 'ERROR',
          summary: 'Có lỗi xảy ra khi cập nhật sản phẩm',
          duration: 5000,
          sticky: true,
        });
        this.loading = false;
      },
    });
  }

  onSubmit() {
    console.log(this.updateProductForm.value);
    this.loading = true;
    if (!this.productId) return;
    this.productService.updateProductById(this.productId, this.updateProductForm.value).subscribe({
      next: () => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Cập nhật sản phẩm thành công',
          duration: 5000, // Duration of the toast notification
          sticky: false,
        });

        // Delay navigation to give time for the toast notification to display
        setTimeout(() => {
          this.router.navigate(['/admin/products/list']);
        }, 2000); // 2-second delay to match the toast duration
      },
      error: (error) => {
        console.error('Error updating product:', error.message);
        this.toast.error({
          detail: 'ERROR',
          summary: 'Có lỗi xảy ra khi cập nhật sản phẩm',
          duration: 5000,
          sticky: true,
        });
        this.loading = false;
      },
    });
  }


}

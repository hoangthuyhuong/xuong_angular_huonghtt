import { Component, inject, OnInit, Pipe } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../types/Products';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgxPaginationModule, PaginationControlsComponent } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    ProductDetailComponent,
    NgFor,
    FormsModule,
     NgxPaginationModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
 productList: Product[] = [];
  filterValue: string = '';
  private searchSubscription: Subscription = new Subscription();
  page: number = 1;
  pageSize: number = 8;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.loadAllProducts(); // Khởi tạo danh sách sản phẩm ban đầu

    this.searchSubscription = this.productService.getSearchValue().subscribe(value => {
      this.filterValue = value;
      this.filterProducts(); // Áp dụng bộ lọc khi có thay đổi
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.productList = data;
      this.page = 1; // Reset về trang đầu tiên mỗi khi tải lại sản phẩm
    });
  }

  filterProducts() {
    if (!this.filterValue) {
      this.loadAllProducts(); // Khởi tạo lại danh sách sản phẩm nếu không có bộ lọc
    } else {
      this.productService.getAllProducts().subscribe((data) => {
        this.productList = data.filter((p) =>
          p.title.toLowerCase().includes(this.filterValue.toLowerCase())
        );
        this.page = 1; // Reset về trang đầu tiên mỗi khi áp dụng bộ lọc
      });
    }
  }
}

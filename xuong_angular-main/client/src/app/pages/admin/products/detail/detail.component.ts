import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../../types/Products';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BidService } from '../../../../services/bid.service';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, DatePipe, CountdownComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'] // Ensure "styleUrls" is plural
})
export class DetailComponent implements OnInit {
  productService = inject(ProductService); // Inject ProductService
  bidService = inject(BidService); // Inject BidService
  route = inject(ActivatedRoute); // Inject ActivatedRoute
  router = inject(Router); // Inject Router

  product: Product | undefined;
  config: CountdownConfig = {
    leftTime: 0,
  };

  bidPriceMax: number = 0;
  bidForm: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.min(1)]),
  });
  productId!: string;
  trackByBid(index: number, bid: any): string {
    return bid.user.username + bid.createdAt;
  }
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  getProductDetail(id: string): void {
    this.productService.getDetailProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        const stepTimeBid = Math.floor(
          (new Date(data.endAt).getTime() - new Date().getTime()) / 1000
        );
        this.config = {
          leftTime: stepTimeBid,
        };
        const maxPrice = Math.max(...data.bids.map((bid) => bid.price));
        this.bidPriceMax = maxPrice;
      },
      error: (error) => {
        // show error message
        console.error(error);
      },
    });
  }

  handleSubmit(): void {
    if (!this.product) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.bidService.createBid({
      product: this.product._id,
      bids: this.product.bids.map((bid) => bid._id),
      user: userId,
      price: this.bidForm.value.price,
      bidPriceMax: this.bidPriceMax,
    }).subscribe({
      next: (data) => {
        console.log(data);
        this.getProductDetail(this.productId);
      },
      error: (error) => {
        // show error message
        console.error(error.message);
      },
    });
  }
}

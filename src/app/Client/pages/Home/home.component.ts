import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        alert('Lỗi khi lấy danh sách sản phẩm: ' + error.message);
        this.products = [];
      }
    });
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        this.router.navigate(['/cart']); // Chuyển hướng đến trang giỏ hàng
      },
      error: (err) => {
        alert(err.message); // Hiển thị thông báo lỗi nếu có
      }
    });
  }
}
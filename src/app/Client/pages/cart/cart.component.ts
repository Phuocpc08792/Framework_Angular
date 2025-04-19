import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, MatDividerModule, MatSnackBarModule]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  displayedColumns: string[] = ['title', 'price', 'quantity', 'total', 'actions'];

  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
      }
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  increaseQuantity(item: any): void {
    const newQuantity = item.quantity + 1;
    this.cartService.updateCartItem(item.productId, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.calculateTotal();
        this.snackBar.open('Cập nhật số lượng thành công!', 'Đóng', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
      }
    });
  }

  decreaseQuantity(item: any): void {
    if (item.quantity <= 1) return;
    const newQuantity = item.quantity - 1;
    this.cartService.updateCartItem(item.productId, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.calculateTotal();
        this.snackBar.open('Cập nhật số lượng thành công!', 'Đóng', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
      }
    });
  }

  removeItem(item: any): void {
    this.cartService.removeFromCart(item.productId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
        this.calculateTotal();
        this.snackBar.open('Xóa sản phẩm thành công!', 'Đóng', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
      }
    });
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      this.snackBar.open('Giỏ hàng trống!', 'Đóng', { duration: 3000 });
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
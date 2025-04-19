import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  address: string = '';
  phone: string = '';
  user: any;
  displayedColumns: string[] = ['title', 'price', 'quantity', 'total'];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      this.snackBar.open('Vui lòng đăng nhập để đặt hàng!', 'Đóng', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }
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

  placeOrder(): void {
    if (!this.address || !this.phone) {
      this.snackBar.open('Vui lòng nhập địa chỉ và số điện thoại.', 'Đóng', { duration: 3000 });
      return;
    }

    const orderData = { address: this.address, phone: this.phone };
    this.orderService.checkout(orderData).subscribe({
      next: (response) => {
        this.snackBar.open(`Đặt hàng thành công! Mã đơn hàng: ${response.order_id}`, 'Đóng', { duration: 3000 });
        this.router.navigate(['/orders']);
        this.cartItems = [];
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
      }
    });
  }
}
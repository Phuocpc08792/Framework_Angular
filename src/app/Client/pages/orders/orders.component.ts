import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, MatSnackBarModule]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  displayedColumns: string[] = ['order_id', 'created_at', 'total', 'status', 'actions'];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Vui lòng đăng nhập để xem đơn hàng!', 'Đóng', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (response) => {
        this.orders = response.data;
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
      }
    });
  }

  viewOrderDetail(orderId: number): void {
    this.router.navigate([`/order/${orderId}`]);
  }

  cancelOrder(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.snackBar.open('Hủy đơn hàng thành công!', 'Đóng', { duration: 3000 });
        this.loadOrders();
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
      }
    });
  }

  getOrderStatus(status: number): string {
    if (status === 1) return 'Chờ xử lý';
    if (status === 0) return 'Đã hủy';
    return 'Đã xử lý';
  }
}
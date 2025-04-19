import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, MatDividerModule, MatSnackBarModule]
})
export class OrderDetailComponent implements OnInit {
  order: any = null;
  displayedColumns: string[] = ['product', 'price', 'quantity', 'total'];
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    public router: Router, 
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Vui lòng đăng nhập để xem chi tiết đơn hàng!', 'Đóng', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    const orderId = +this.route.snapshot.paramMap.get('id')!;
    this.loadOrderDetail(orderId);
  }

  loadOrderDetail(orderId: number): void {
    this.orderService.getOrderDetail(orderId).subscribe({
      next: (response) => {
        this.order = response.data;
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
        this.router.navigate(['/orders']);
      }
    });
  }

  getOrderStatus(status: number): string {
    if (status === 1) return 'Chờ xử lý';
    if (status === 0) return 'Đã hủy';
    return 'Đã xử lý';
  }
}
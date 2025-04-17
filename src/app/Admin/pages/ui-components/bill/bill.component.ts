import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  displayedColumns: string[] = ['product', 'quantity', 'amount', 'status', 'actions'];

  orders = [
    {
      productName: 'Sản phẩm A',
      productImage: './assets/images/products/p1.jpg',
      totalPrice: 499,
      quantity: 2,
      paymentStatus: 'Đã thanh toán',
      paymentProgress: 100,
      status: 'Đang giao hàng'
    },
    {
      productName: 'Sản phẩm B',
      productImage: './assets/images/products/p2.jpg',
      totalPrice: 499,
      quantity: 1,
      paymentStatus: 'Chưa thanh toán',
      paymentProgress: 30,
      status: 'Đã hủy'
    },
    {
      productName: 'Sản phẩm C',
      productImage: './assets/images/products/p3.jpg',
      totalPrice: 499,
      quantity: 3,
      paymentStatus: 'Chưa thanh toán',
      paymentProgress: 30,
      status: 'Chờ xác nhận'
    },
    {
      productName: 'Sản phẩm D',
      productImage: './assets/images/products/p4.jpg',
      totalPrice: 499,
      quantity: 1,
      paymentStatus: 'Đã thanh toán',
      paymentProgress: 30,
      status: 'Đã hủy'
    },
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'Đã hủy':
        return 'warn';
      case 'Đang giao hàng':
        return 'primary';
      case 'Chờ xác nhận':
        return 'accent';
      default:
        return '';
    }
  }
}

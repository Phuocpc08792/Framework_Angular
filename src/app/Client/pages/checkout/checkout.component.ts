import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  address: string = '';
  phone: string = '';
  user: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      alert('Vui lòng đăng nhập để đặt hàng!');
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
        alert('Lỗi khi tải giỏ hàng: ' + err.message);
      }
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  placeOrder(): void {
    if (!this.address || !this.phone) {
      alert('Vui lòng nhập địa chỉ và số điện thoại.');
      return;
    }

    const orderData = {
      address: this.address,
      phone: this.phone
    };

    this.orderService.checkout(orderData).subscribe({
      next: (response) => {
        alert('Đặt hàng thành công! Mã đơn hàng: ' + response.order_id);
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        alert('Lỗi khi đặt hàng: ' + err.message);
      }
    });
  }
}
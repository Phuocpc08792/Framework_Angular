import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-side-register',
  templateUrl: './side-register.component.html',
  styleUrls: ['./side-register.component.scss'],
})
export class SideRegisterComponent {
  registerForm!: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.snackBar.open('Đăng ký thành công! Vui lòng đăng nhập.', 'Đóng', { duration: 2000 });
          this.router.navigate(['/authentication/login']);
        },
        error: (err) => {
          this.errorMsg = err.error.message || 'Đăng ký thất bại!';
          this.snackBar.open('Đăng ký thất bại!', 'Đóng', { duration: 3000 });
        },
      });
    }
  }
}
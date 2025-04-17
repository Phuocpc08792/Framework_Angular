import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, User } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.loadUser();
  }

  loadUser() {
    this.userService.getById(this.userId).subscribe({
      next: (user) => {
        if (!user) {
          this.snackBar.open('Không tìm thấy người dùng', 'Đóng', { duration: 3000 });
          this.router.navigate(['/admin/ui-components/user']);
        } else {
          this.userForm.patchValue(user);
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.snackBar.open('Người dùng không tồn tại', 'Đóng', { duration: 3000 });
        } else {
          this.snackBar.open('Có lỗi xảy ra, vui lòng thử lại', 'Đóng', { duration: 3000 });
        }
        this.router.navigate(['/admin/ui-components/user']);
      },
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.update(this.userId, this.userForm.value).subscribe({
        next: () => {
          this.snackBar.open('Cập nhật người dùng thành công', 'Đóng', { duration: 2000 });
          this.router.navigate(['/admin/ui-components/user']);
        },
        error: (err) => {
          this.snackBar.open('Lỗi khi cập nhật người dùng: ' + err.message, 'Đóng', { duration: 3000 });
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/admin/ui-components/user']);
  }
}

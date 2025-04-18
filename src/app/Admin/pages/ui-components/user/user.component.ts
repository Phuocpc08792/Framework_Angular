import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { UserService, User } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RouterModule, // Thêm RouterModule để dùng routerLink
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const dataStr = `${data.name} ${data.email} ${data.role} ${data.phone ?? ''}`.toLowerCase();
      return dataStr.includes(filter);
    };

    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.dataSource.data = users;
      },
      error: (err) => {
        this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editUser(userId: number) {
    this.router.navigate([`/Admin/ui-components/user/edit/${userId}`]);
  }

  deleteUser(id: number) {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
      this.userService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Xóa người dùng thành công!', 'Đóng', { duration: 2000 });
          this.loadUsers();
        },
        error: (err) => {
          this.snackBar.open(err.message, 'Đóng', { duration: 3000 });
        },
      });
    }
  }
}
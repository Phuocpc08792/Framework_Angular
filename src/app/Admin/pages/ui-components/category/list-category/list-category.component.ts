import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { CategoryService, Category } from 'src/app/services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'danhmuc', 'hanhdong'];
  dataSource = new MatTableDataSource<Category>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loadCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.dataSource.data = categories;
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Đóng', { duration: 3000 });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategory(id: number) {
    if (confirm('Bạn có chắc muốn xóa danh mục này không?')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Xóa danh mục thành công', 'Đóng', { duration: 2000 });
          this.loadCategories(); // Tải lại danh sách
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Đóng', { duration: 3000 });
        },
      });
    }
  }

  editCategory(id: number) {
    this.router.navigate(['/Admin/ui-components/category/edit', id]);
  }
}
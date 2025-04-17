import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ProductService, Product } from 'src/app/services/product.service';
import { CategoryService, Category } from 'src/app/services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-product',
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
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MaterialModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'image', 'name', 'description', 'price', 'category', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  categories: Category[] = [];
  selectedCategory: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loadCategories();
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
        this.snackBar.open('Không thể tải danh mục: ' + error.message, 'Đóng', { duration: 3000 });
      },
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (products) => {
        console.log('Danh sách sản phẩm từ API:', products);
        if (products && Array.isArray(products)) {
          this.dataSource.data = products;
        } else {
          this.dataSource.data = [];
          this.snackBar.open('Danh sách sản phẩm trống hoặc dữ liệu không hợp lệ', 'Đóng', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        this.dataSource.data = [];
        this.snackBar.open('Không thể tải danh sách sản phẩm: ' + error.message, 'Đóng', { duration: 3000 });
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

  filterByCategory() {
    if (this.selectedCategory === null) {
      this.loadProducts();
    } else {
      this.productService.getAll().subscribe({
        next: (products) => {
          if (products && Array.isArray(products)) {
            this.dataSource.data = products.filter(
              (product) => product.categoryId === this.selectedCategory
            );
          } else {
            this.dataSource.data = [];
            this.snackBar.open('Không có sản phẩm nào trong danh mục này', 'Đóng', { duration: 3000 });
          }
        },
        error: (error) => {
          console.error('Lỗi khi lọc sản phẩm theo danh mục:', error);
          this.snackBar.open('Không thể lọc sản phẩm: ' + error.message, 'Đóng', { duration: 3000 });
        },
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Xóa sản phẩm thành công', 'Đóng', { duration: 2000 });
          this.loadProducts();
        },
        error: (error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
          this.snackBar.open('Không thể xóa sản phẩm: ' + error.message, 'Đóng', { duration: 3000 });
        },
      });
    }
  }

  editProduct(id: number) {
    this.router.navigate(['/admin/ui-components/product/edit', id]);
  }
}
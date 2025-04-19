import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService, Category } from 'src/app/services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1)]],
      categoryId: [null, Validators.required],
      description: ['', [Validators.minLength(3)]], // Thêm trường description
      image: [null],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Đóng', { duration: 3000 });
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;
    const productData = {
      name: formValue.name,
      price: formValue.price,
      categoryId: formValue.categoryId,
      description: formValue.description || undefined, // Gửi description
      image: formValue.image ? formValue.image.name : undefined,
    };

    this.productService.create(productData).subscribe({
      next: () => {
        this.snackBar.open('Thêm sản phẩm thành công', 'Đóng', { duration: 2000 });
        this.router.navigate(['/Admin/ui-components/product']);
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Đóng', { duration: 3000 });
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/Admin/ui-components/product']);
  }

  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Trường này là bắt buộc';
    }
    if (control?.hasError('minlength')) {
      return controlName === 'name' ? 'Tên sản phẩm phải có ít nhất 3 ký tự' : 'Mô tả phải có ít nhất 3 ký tự';
    }
    if (control?.hasError('min')) {
      return 'Giá phải là số dương';
    }
    return '';
  }
}
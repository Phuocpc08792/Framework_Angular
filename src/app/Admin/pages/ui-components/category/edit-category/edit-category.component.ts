import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService, Category } from 'src/app/services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getById(this.categoryId).subscribe({
      next: (category) => {
        this.categoryForm.patchValue({
          name: category.name,
        });
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Đóng', { duration: 3000 });
        this.router.navigate(['/admin/ui-components/category']);
      },
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const { name } = this.categoryForm.value;
    this.categoryService.update(this.categoryId, name).subscribe({
      next: () => {
        this.snackBar.open('Cập nhật danh mục thành công', 'Đóng', { duration: 2000 });
        this.router.navigate(['/admin/ui-components/category']);
      },
      error: (error) => {
        this.snackBar.open(error.message, 'Đóng', { duration: 3000 });
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/ui-components/category']);
  }

  getErrorMessage(controlName: string): string {
    const control = this.categoryForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Trường này là bắt buộc';
    }
    if (control?.hasError('minlength')) {
      return 'Tên danh mục phải có ít nhất 3 ký tự';
    }
    return '';
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  condition: 'Mới' | 'Cũ';
  color?: string;
  imageFile?: File;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MaterialModule, 
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    condition: 'Mới',
    color: '',
    imageFile: undefined
  };

  categories: string[] = ['Electronics', 'Accessories', 'Furniture'];

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newProduct.imageFile = file;
    }
  }

  addProduct() {
    if (this.newProduct.name.trim() && this.newProduct.price > 0 && this.newProduct.category) {
      console.log('Thêm sản phẩm:', this.newProduct);
      this.newProduct = { id: 0, name: '', price: 0, category: '', condition: 'Mới', color: '', imageFile: undefined };
    }
  }
}

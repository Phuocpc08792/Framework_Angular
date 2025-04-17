import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-blog',
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
    MatChipsModule,
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './blog.component.html'
})
export class BlogComponent {
  displayedColumns: string[] = ['id', 'title', 'content', 'actions'];
  dataSource = new MatTableDataSource<BlogPost>([
    { id: 1, title: 'Những mẫu xe hơi tiết kiệm nhiên liệu nhất 2024', content: 'Danh sách những mẫu xe tiết kiệm nhiên liệu hàng đầu năm nay.' },
    { id: 2, title: 'Công nghệ ô tô điện đang thay đổi thế giới', content: 'Xe điện đang trở thành xu hướng và phát triển mạnh mẽ.' },
    { id: 3, title: 'So sánh giữa SUV và Sedan - Nên chọn loại nào?', content: 'Phân tích ưu và nhược điểm của hai dòng xe phổ biến.' },
    { id: 4, title: 'Bảo dưỡng xe hơi đúng cách giúp tăng tuổi thọ xe', content: 'Những mẹo bảo dưỡng xe hơi để duy trì hiệu suất tối ưu.' },
    { id: 5, title: 'Top 5 mẫu xe thể thao đáng mua nhất năm 2024', content: 'Những mẫu xe thể thao đáng chú ý với hiệu suất mạnh mẽ.' }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePost(id: number) {
    this.dataSource.data = this.dataSource.data.filter(post => post.id !== id);
  }

  openEditPostDialog(post: BlogPost) {
    console.log('Mở hộp thoại chỉnh sửa', post);
  }
}

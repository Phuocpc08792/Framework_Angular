import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Comment {
  id: number;
  name: string;
  avatar: string;
  email: string;
  title: string;
  message: string;
  rating: number;
  status: 'approved' | 'pending' | 'rejected';
  category: string;
  date: Date;
}

@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class CommentComponent {
  displayedColumns: string[] = [
    'avatar',
    'id',
    'name',
    'email',
    'title',
    'message',
    'rating',
    'status',
    'category',
    'date',
    'actions',
  ];

  dataSource = new MatTableDataSource<Comment>([
    {
      id: 1,
      name: 'Nguyễn Hữu Tâm',
      avatar: 'https://i.pravatar.cc/40?img=4',
      email: 'nguyenhuutam@example.com',
      title: 'Trải nghiệm tuyệt vời!',
      message: 'Xe chạy rất êm, máy móc ổn định, giá cả hợp lý!',
      rating: 5,
      status: 'approved',
      category: 'Xe tay ga',
      date: new Date('2025-03-20'),
    },
    {
      id: 2,
      name: 'Trần Minh Tuấn',
      avatar: 'https://i.pravatar.cc/40?img=5',
      email: 'tranminhtuan@example.com',
      title: 'Dịch vụ tốt',
      message: 'Phụ tùng chất lượng, bảo hành dài hạn, rất đáng tin cậy.',
      rating: 4,
      status: 'pending',
      category: 'Phụ tùng',
      date: new Date('2025-03-22'),
    },
    {
      id: 3,
      name: 'Lê Quang Hùng',
      avatar: 'https://i.pravatar.cc/40?img=6',
      email: 'lequanghung@example.com',
      title: 'Hài lòng',
      message: 'Giao xe đúng hẹn, hỗ trợ tư vấn kỹ thuật rất tốt!',
      rating: 5,
      status: 'approved',
      category: 'Xe số',
      date: new Date('2025-03-23'),
    },
  ]);
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }  

  deleteComment(id: number) {
    this.dataSource.data = this.dataSource.data.filter((c) => c.id !== id);
  }

  editComment(comment: Comment) {
    const updatedMessage = prompt('Chỉnh sửa bình luận:', comment.message);
    if (updatedMessage && updatedMessage.trim()) {
      comment.message = updatedMessage.trim();
    }
  }
}

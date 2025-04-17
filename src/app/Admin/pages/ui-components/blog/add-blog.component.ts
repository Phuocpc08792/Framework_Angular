import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './add-blog.component.html',
})
export class AddBlogComponent {
  newPost: BlogPost = { id: 0, title: '', content: '' };
  blogPosts: BlogPost[] = [];

  addPost() {
    if (this.newPost.title.trim() && this.newPost.content.trim()) {
      this.newPost.id = this.blogPosts.length + 1;
      this.blogPosts = [...this.blogPosts, this.newPost];
      this.newPost = { id: 0, title: '', content: '' };
    }
  }
}

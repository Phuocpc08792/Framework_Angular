import { Routes } from '@angular/router';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';

import { AddBlogComponent } from './blog/add-blog.component';
import { BlogComponent } from './blog/blog.component';
import { CommentComponent } from './comment/comment.component';
import { BillComponent } from './bill/bill.component';
import { AddProductComponent } from './product/add-product/add-product.component'; // Cập nhật đường dẫn
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { UserComponent } from './user/user.component';
// import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user-dialog.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
  },


  {
    path: 'user/edit/:id',
    component: EditUserComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'comment',
        component: CommentComponent,
      },
      {
        path: 'add-product',
        component: AddProductComponent,
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            component: ProductComponent,
          },
          {
            path: 'edit/:id',
            component: EditProductComponent,
          },
        ],
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            component: ListCategoryComponent,
          },
          {
            path: 'add-category',
            component: AddCategoryComponent,
          },
          {
            path: 'edit/:id',
            component: EditCategoryComponent,
          },
        ],
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'add-blog',
        component: AddBlogComponent,
      },
      {
        path: 'bill',
        component: BillComponent,
      },
    ],
  },
];
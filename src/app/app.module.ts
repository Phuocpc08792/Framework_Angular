import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { FullComponent } from './Admin/layouts/full/full.component';
import { BlankComponent } from './Admin/layouts/blank/blank.component';
import { MainClientComponent } from './Client/main-client/main-client.component';
import { UserComponent } from './Admin/pages/ui-components/user/user.component';
import { EditUserComponent } from './Admin/pages/ui-components/user/edit-user/edit-user-dialog.component';
import { HeaderComponent } from './Admin/layouts/full/header/header.component';
import { SidebarComponent } from './Admin/layouts/full/sidebar/sidebar.component';
import { AppTopstripComponent } from './Admin/layouts/full/top-strip/topstrip.component';
import { AppNavItemComponent } from './Admin/layouts/full/sidebar/nav-item/nav-item.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { SideLoginComponent } from './Auth/side-login/side-login.component';
import { SideRegisterComponent } from './Auth/side-register/side-register.component';
import { AuthModule } from './Auth/auth.module';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    MainClientComponent,
    UserComponent,
    EditUserComponent,
    HeaderComponent,
    SidebarComponent,
    AppTopstripComponent,
    AppNavItemComponent,
    SideLoginComponent,
    SideRegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    NgScrollbarModule,
    AuthModule,
    TablerIconsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
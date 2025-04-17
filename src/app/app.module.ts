import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { FullComponent } from './Admin/layouts/full/full.component';
import { BlankComponent } from './Admin/layouts/blank/blank.component';
import { MainClientComponent } from './Client/main-client/main-client.component';
import { UserComponent } from './Admin/pages/ui-components/user/user.component';
import { EditUserComponent } from './Admin/pages/ui-components/user/edit-user/edit-user-dialog.component';
// import { AddUserComponent } from './Admin/pages/ui-components/user/add-user/add-user.component';
import { HeaderComponent } from './Admin/layouts/full/header/header.component';
import { SidebarComponent } from './Admin/layouts/full/sidebar/sidebar.component';
import { AppTopstripComponent } from './Admin/layouts/full/top-strip/topstrip.component';
import { AppNavItemComponent } from './Admin/layouts/full/sidebar/nav-item/nav-item.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    // AddUserComponent,
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
    MaterialModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    AuthModule,
    TablerIconsModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
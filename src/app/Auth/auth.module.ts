import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SideLoginComponent } from './side-login/side-login.component';
import { SideRegisterComponent } from './side-register/side-register.component';

@NgModule({
    declarations: [
        SideLoginComponent,
        SideRegisterComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule ,
        CommonModule
    ]
})
export class AuthModule { }

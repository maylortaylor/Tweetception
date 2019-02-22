import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [LoginComponent, RegisterComponent],
  declarations: [LoginComponent, RegisterComponent],
  providers: [],
})
export class AuthModule { }

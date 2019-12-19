import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { HttpClientModule } from "@angular/common/http";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class LoginModule {}

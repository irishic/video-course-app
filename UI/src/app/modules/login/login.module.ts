import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { FormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { HttpClientModule } from "@angular/common/http";
import { ModalDialogComponent } from "../../shared/components/modal-dialog/modal-dialog.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { InfoComponent } from "src/app/shared/components/modal-dialog/info/info.component";

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  entryComponents: [ModalDialogComponent, InfoComponent]
})
export class LoginModule {}

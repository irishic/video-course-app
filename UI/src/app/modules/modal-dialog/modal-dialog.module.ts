import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalDialogComponent } from "./modal-dialog/modal-dialog.component";
import {
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";
import { ModalDialogService } from "./services/modal-dialog.service";
import { ConfirmComponent } from "./modal-dialog/confirm/confirm.component";
import { InfoComponent } from "./modal-dialog/info/info.component";

@NgModule({
  declarations: [ModalDialogComponent, ConfirmComponent, InfoComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {
      provide: "ModalDialogService",
      useClass: ModalDialogService
    }
  ],
  entryComponents: [ModalDialogComponent]
})
export class ModalDialogModule {}

import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";

@Injectable({
  providedIn: "root"
})
export class ModalDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog({ text, action }) {
    this.dialog.open(ModalDialogComponent, {
      data: {
        text,
        type: "confirm",
        okAction: action
      }
    });
  }
  openInfoDialog({ text }) {
    this.dialog.open(ModalDialogComponent, {
      data: {
        text,
        type: "info"
      }
    });
  }
}

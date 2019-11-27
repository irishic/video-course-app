import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatDialogData } from "src/app/domain/interfaces/mat-dialog-data";

@Component({
  selector: "app-modal-dialog",
  templateUrl: "./modal-dialog.component.html",
  styleUrls: ["./modal-dialog.component.scss"]
})
export class ModalDialogComponent implements OnInit {
  @Input() text: string;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData
  ) {}

  ngOnInit() {}
}

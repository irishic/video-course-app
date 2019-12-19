import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-modal-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"]
})
export class ConfirmComponent {
  @Input() text: string;
  @Output() okAction = new EventEmitter();
  constructor() {}
}

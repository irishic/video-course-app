import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-modal-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent implements OnInit {
  @Input() text: string;
  constructor() {}

  ngOnInit() {}
}

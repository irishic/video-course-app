import { Component, OnInit } from "@angular/core";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-header-controls",
  templateUrl: "./header-controls.component.html",
  styleUrls: ["./header-controls.component.scss"]
})
export class HeaderControlsComponent implements OnInit {
  constructor() {}
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  ngOnInit() {}
}

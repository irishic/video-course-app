import { Component, OnInit } from "@angular/core";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-header-controls",
  templateUrl: "./header-controls.component.html",
  styleUrls: ["./header-controls.component.scss"]
})
export class HeaderControlsComponent implements OnInit {
  user;
  constructor(public authService: AuthService) {}
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.user = this.authService.getUserInfo();
  }
}

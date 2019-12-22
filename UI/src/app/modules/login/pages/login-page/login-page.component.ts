import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  userEmail: string;
  userPassword: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  loginUser(email, password) {
    this.authService.login({ email, password, nextRoute: "courses" });
  }
}

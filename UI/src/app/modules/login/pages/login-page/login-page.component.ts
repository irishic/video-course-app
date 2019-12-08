import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}
  userEmail: string;
  userPassword: string;
  ngOnInit() {}

  loginUser(email, password) {
    this.authService.login({ email, password });
    this.router.navigate(["courses"]);
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent implements OnInit {
  constructor(public authService: AuthService) {}
  userEmail: string;
  firstName: string;
  lastName: string;
  userPassword: string;
  ngOnInit() {}

  signUp(email, password, firstName, lastName) {
    this.authService.register({ email, password, firstName, lastName });
  }
}

import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AuthService } from "../../../../shared/services/auth.service";
import { login } from "src/app/actions/auth.actions";
import { UserInterface } from "src/app/domain/interfaces/user";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  userEmail: string;
  userPassword: string;

  constructor(
    public authService: AuthService,
    private store: Store<{ user: UserInterface }>
  ) {}

  ngOnInit() {}

  loginUser(email, password) {
    this.store.dispatch(login({ email, password }));
  }
}

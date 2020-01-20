import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthService } from "../../../../shared/services/auth.service";
import { login } from "src/app/actions/auth.actions";
import { UserInterface } from "src/app/domain/interfaces/user";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    public authService: AuthService,
    private store: Store<{ user: UserInterface }>
  ) {
    this.form = new FormGroup({
      userEmail: new FormControl("", Validators.required),
      userPassword: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  loginUser() {
    const { userEmail, userPassword } = this.form.value;
    this.store.dispatch(
      login({
        email: userEmail,
        password: userPassword
      })
    );
  }
}

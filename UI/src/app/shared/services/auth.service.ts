import { Injectable } from "@angular/core";
import { User } from "../../domain/models/user";
import { UserInterface } from "../../domain/interfaces/user";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserDataHttpResponse } from "src/app/domain/interfaces/user-data-http-response";
import { CookieService } from "ngx-cookie-service";
import { ModalDialogService } from "src/app/modules/modal-dialog/services/modal-dialog.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser: UserInterface;
  sessionToken: string;

  constructor(
    public router: Router,
    private httpClient: HttpClient,
    private dialogService: ModalDialogService,
    private cookieService: CookieService
  ) {}

  updateUserInfoWithCookies() {
    const token = this.cookieService.get("video-app-token");
    if (token) {
      return this.httpClient
        .get<UserInterface>(`http://localhost:3000/user?token=${token}`)
        .pipe(
          map(userInfo => {
            this.currentUser = userInfo;
            return this.currentUser;
          })
        );
    } else {
      return new Observable(observer => {
        observer.next(this.currentUser);
      });
    }
  }

  getUserInfo() {
    return this.currentUser;
  }

  getToken() {
    return this.sessionToken;
  }

  login({ email, password, nextRoute }) {
    return this.httpClient
      .post<UserDataHttpResponse>("http://localhost:3000/login", {
        email,
        password
      })
      .subscribe(
        ({ user, accessToken }) => {
          this.currentUser = new User(
            user.id,
            user.firstName,
            user.lastName,
            email
          );
          this.sessionToken = accessToken;
          this.router.navigate([nextRoute]);
          this.cookieService.set("video-app-token", accessToken);
        },
        error => {
          error.status === 404
            ? this.dialogService.openInfoDialog({
                text: "User doesnt exist yet. Consider Sign Up first :)"
              })
            : console.error(error);
        }
      );
  }

  register({ email, password, firstName, lastName }) {
    return this.httpClient
      .post<UserDataHttpResponse>("http://localhost:3000/register", {
        email,
        password,
        firstName,
        lastName
      })
      .subscribe(
        response => {
          this.dialogService.openInfoDialog({
            text: "Successful registration! Welcome :) \nNow you can login"
          });
        },
        error => {
          error.status === 400
            ? this.dialogService.openInfoDialog({
                text:
                  "User already exists :) Try to log in or sign up with another login"
              })
            : console.error(error);
        }
      );
  }

  logout() {
    this.currentUser = null;
    this.router.navigateByUrl("/login");
    this.cookieService.delete("video-app-token");
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}

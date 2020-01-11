import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserDataHttpResponse } from "src/app/domain/interfaces/user-data-http-response";
import { CookieService } from "ngx-cookie-service";
import { ModalDialogService } from "src/app/modules/modal-dialog/services/modal-dialog.service";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { UserInterface } from "src/app/domain/interfaces/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser: UserInterface;
  sessionToken: string;

  constructor(
    private store: Store<{ user: UserInterface }>,
    public router: Router,
    private httpClient: HttpClient,
    private dialogService: ModalDialogService,
    private cookieService: CookieService
  ) {}

  updateUserInfoWithCookies(): Observable<UserInterface> {
    const token = this.cookieService.get("video-app-token");
    return token
      ? this.httpClient.get<UserInterface>(
          `http://localhost:3000/user?token=${token}`
        )
      : new Observable(subscriber => subscriber.next(null));
  }

  getUserInfo() {
    return this.currentUser;
  }

  getToken() {
    return this.sessionToken;
  }

  login({ email, password }) {
    return this.httpClient.post<UserDataHttpResponse>(
      "http://localhost:3000/login",
      {
        email,
        password
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

  isAuthenticated() {
    return !!this.currentUser;
  }
}

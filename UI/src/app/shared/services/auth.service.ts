import { Injectable, OnInit } from "@angular/core";
import { User } from "../../domain/models/user";
import { UserInterface } from "../../domain/interfaces/user";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../components/modal-dialog/modal-dialog.component";
import { UserDataHttpResponse } from "src/app/domain/interfaces/user-data-http-response";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser: UserInterface;
  sessionToken: string;

  constructor(
    public router: Router,
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {}

  updateUserInfoWithCookies() {
    const token = this.cookieService.get("video-app-token");
    if (token) {
      return this.httpClient
        .get<UserInterface>(`http://localhost:3000/user?token=${token}`)
        .toPromise()
        .then(userInfo => {
          this.currentUser = userInfo;
          this.sessionToken = token;
          return this.currentUser;
        });
    } else {
      return Promise.resolve(this.currentUser);
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
            ? this.dialog.open(ModalDialogComponent, {
                data: {
                  type: "info",
                  text: "User doesnt exist yet. Consider Sign Up first :)"
                }
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
          this.dialog.open(ModalDialogComponent, {
            data: {
              type: "info",
              text: "Successful registration! Welcome :) \nNow you can login"
            }
          });
        },
        error => {
          error.status === 400
            ? this.dialog.open(ModalDialogComponent, {
                data: {
                  type: "info",
                  text:
                    "User already exists :) Try to log in or sign up with another login"
                }
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

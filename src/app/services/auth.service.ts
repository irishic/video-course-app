import { Injectable } from "@angular/core";
import { User } from "../domain/models/user";
import { UserInterface } from "../domain/interfaces/user";
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService implements CanActivate {
  currentUser: UserInterface;

  constructor(public router: Router) {}

  getUserInfo() {
    return {
      lastName: "User LastName",
      firstName: "User FirstName",
      id: "1"
    };
  }

  canActivate() {
    if (!this.isAuthenticated()) {
      this.router.navigate(["login"]);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

  login({ email, password }) {
    const userInfo = this.getUserInfo();
    this.currentUser = new User(
      userInfo.id,
      userInfo.firstName,
      userInfo.lastName,
      email
    );
  }

  logout() {
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}

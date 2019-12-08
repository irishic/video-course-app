import { Injectable } from "@angular/core";
import { User } from "../../domain/models/user";
import { UserInterface } from "../../domain/interfaces/user";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser: UserInterface;

  constructor(public router: Router) {}

  getUserInfo() {
    return {
      lastName: "User LastName",
      firstName: "User FirstName",
      id: "1"
    };
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

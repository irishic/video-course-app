import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      return this.authService.updateUserInfoWithCookies().then(user => {
        return !!user || this.router.parseUrl("/login");
      });
    } else {
      return Promise.resolve(true);
    }
  }
}

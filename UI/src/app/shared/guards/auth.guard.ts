import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      return this.authService
        .updateUserInfoWithCookies()
        .pipe(map(user => !!user || this.router.parseUrl("/login")));
    }
    return Promise.resolve(true);
  }
}

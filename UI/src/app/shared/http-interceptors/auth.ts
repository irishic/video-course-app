import { Injectable } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { CookieService } from "ngx-cookie-service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token =
      this.authService.getToken() || this.cookieService.get("video-app-token");
    if (token) {
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: token
        }
      });
    }
    return next.handle(req);
  }
}

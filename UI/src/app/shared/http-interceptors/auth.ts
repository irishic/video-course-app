import { Injectable } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { CookieService } from "ngx-cookie-service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import * as fromRoot from "src/app/reducers";
import { Store, select } from '@ngrx/store';
import { map, flatMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<fromRoot.State>,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.pipe(
      select(fromRoot.getUserToken),
      take(1),
      map(token => {
        return token || this.cookieService.get("video-app-token");
      }),
      flatMap(token => {
        if (token) {
          req = req.clone({
            setHeaders: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: token
            }
          });
        }
        return next.handle(req);
      })
    );
  }
}

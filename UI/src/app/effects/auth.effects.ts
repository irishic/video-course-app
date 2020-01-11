import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/shared/services/auth.service";
import { exhaustMap, map, catchError, tap } from "rxjs/operators";
import {
  loginSuccess,
  loginFailure,
  login,
  updateWithCookies,
  logout
} from "../actions/auth.actions";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Store } from "@ngrx/store";
import { UserInterface } from "src/app/domain/interfaces/user";
import { ModalDialogService } from "src/app/modules/modal-dialog/services/modal-dialog.service";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(action => this.authService.login(action)),
      map(userData => loginSuccess({ userData })),
      catchError(error => of(loginFailure({ error })))
    )
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.router.navigateByUrl("/login");
          this.cookieService.delete("video-app-token");
        })
      );
    },
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ userData }) => {
          this.cookieService.set("video-app-token", userData.accessToken);
          this.router.navigate(["/courses"]);
        })
      );
    },
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginFailure),
        tap(({ error }) => {
          if (error.status === 404) {
            this.dialogService.openInfoDialog({
              text: "User doesn't exist! Try to Sign up first"
            });
          }
        })
      );
    },
    { dispatch: false }
  );

  updateWithCookies$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updateWithCookies),
        exhaustMap(() => this.authService.updateUserInfoWithCookies()),
        tap(userInfo => {
          if (userInfo) {
            const userData = {
              user: userInfo,
              accessToken: this.cookieService.get("video-app-token")
            };
            return this.store.dispatch(loginSuccess({ userData }));
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private dialogService: ModalDialogService,
    private store: Store<{ user: UserInterface }>,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}
}

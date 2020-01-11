import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { UserInterface } from "src/app/domain/interfaces/user";
import { selectStoreUser } from "src/app/reducers/index";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<{ user: UserInterface }>
  ) {}

  canActivate() {
    return this.store.pipe(
      select(selectStoreUser),
      map(user => {
        if (!user) {
          this.router.navigateByUrl("/login");
        }
        return !!user;
      })
    );
  }
}

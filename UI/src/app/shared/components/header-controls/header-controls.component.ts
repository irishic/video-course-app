import { Component, OnInit, OnDestroy } from "@angular/core";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../services/auth.service";
import { UserInterface } from "src/app/domain/interfaces/user";
import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";
import { selectStoreUser } from "src/app/reducers/index";
import { logout } from "src/app/actions/auth.actions";

@Component({
  selector: "app-header-controls",
  templateUrl: "./header-controls.component.html",
  styleUrls: ["./header-controls.component.scss"]
})
export class HeaderControlsComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  user;

  constructor(
    public authService: AuthService,
    private store: Store<{ user: UserInterface }>
  ) {}

  ngOnInit() {
    this.user = this.authService.getUserInfo();
    this.userSubscription = this.store
      .pipe(select(selectStoreUser))
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.store.dispatch(logout());
  }
}

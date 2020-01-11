import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserInterface } from "src/app/domain/interfaces/user";
import { updateWithCookies } from "./actions/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "video-course-app";

  constructor(private store: Store<{ user: UserInterface }>) {}

  ngOnInit() {
    this.store.dispatch(updateWithCookies());
  }
}

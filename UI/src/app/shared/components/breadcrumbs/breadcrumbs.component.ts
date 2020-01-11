import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ActivationEnd } from "@angular/router";
import { BreadcrumbInterface } from "../../../domain/interfaces/breadcrumb";
import { BreadcrumbsService } from "../../services/breadcrumbs.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: BreadcrumbInterface[] = [];
  routerEventsSubscription: Subscription;

  constructor(
    private router: Router,
    private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit() {
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      let eventSubscription;
      if (event instanceof ActivationEnd) {
        eventSubscription = this.breadcrumbsService
          .updateBreadcrumbsData()
          .subscribe(breadcrumbs => {
            this.breadcrumbs = breadcrumbs;
          });
        eventSubscription.unsubscribe();
      }
    });
  }
}

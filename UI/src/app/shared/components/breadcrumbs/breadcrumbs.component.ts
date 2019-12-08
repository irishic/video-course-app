import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ActivationEnd } from "@angular/router";
import { BreadcrumbInterface } from "../../../domain/interfaces/breadcrumb";
import { BreadcrumbsService } from "../../services/breadcrumbs.service";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent implements OnInit {
  constructor(
    private router: Router,
    private breadcrumbsService: BreadcrumbsService
  ) {}
  breadcrumbs: BreadcrumbInterface[] = [];

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.breadcrumbs = this.breadcrumbsService.updateBreadcrumbsData();
      }
    });
  }
}

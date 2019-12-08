import { Injectable } from "@angular/core";
import { BreadcrumbInterface } from "../../domain/interfaces/breadcrumb";
import { CoursesDataService } from "../../modules/courses/services/courses-data.service";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class BreadcrumbsService {
  constructor(
    private coursesData: CoursesDataService,
    private activatedRoute: ActivatedRoute
  ) {}
  breadcrumbs: BreadcrumbInterface[] = [];

  updateBreadcrumbsData(): BreadcrumbInterface[] {
    const breadcrumbRouteInfo = this.activatedRoute.firstChild.snapshot.data
      .breadcrumb;

    if (breadcrumbRouteInfo) {
      const label =
        breadcrumbRouteInfo.label ||
        this.getDynamicBreadcrumbLabel(breadcrumbRouteInfo);

      const route = this.activatedRoute.snapshot.firstChild.url
        .map(urlInfo => urlInfo.path)
        .join("/");

      const newBreadcrumb = this.createBreadcrumb({ label, route });
      const sameExistingBreadcrumb = this.findSameBreadcrumb(newBreadcrumb);

      if (sameExistingBreadcrumb) {
        this.breadcrumbs = this.breadcrumbs.slice(
          0,
          this.breadcrumbs.indexOf(sameExistingBreadcrumb) + 1
        );
      } else {
        this.breadcrumbs.push(newBreadcrumb);
      }
    }

    return this.breadcrumbs;
  }

  findSameBreadcrumb(breadcrumb) {
    return this.breadcrumbs.find(b => b.urlParams[0] === breadcrumb.urlParams[0]);
  }

  createBreadcrumb({ label, route }) {
    const breadcrumb: BreadcrumbInterface = {
      label,
      urlParams: [route]
    };
    return breadcrumb;
  }

  getDynamicBreadcrumbLabel(breadcrumbRouteInfo): string {
    const { dynamicLabel, dynamicKey } = breadcrumbRouteInfo;
    if (dynamicKey === "courseId") {
      const targetCourse = this.coursesData.getCourseById(
        this.activatedRoute.firstChild.snapshot.params.courseId
      );
      return targetCourse ? targetCourse[dynamicLabel] : 'new';
    }
  }
}

import { Injectable } from "@angular/core";
import { BreadcrumbInterface } from "../../domain/interfaces/breadcrumb";
import { CoursesDataService } from "../../modules/courses/services/courses-data.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BreadcrumbsService {
  breadcrumbs: BreadcrumbInterface[] = [];

  constructor(
    private coursesData: CoursesDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  updateBreadcrumbsData(): Observable<BreadcrumbInterface[]> {
    const breadcrumbRouteInfo = this.activatedRoute.firstChild.snapshot.data
      .breadcrumb;

    const route = this.activatedRoute.snapshot.firstChild.url
      .map(urlInfo => urlInfo.path)
      .join("/");

    return this.getDynamicBreadcrumbLabel(breadcrumbRouteInfo).pipe(
      map(label => {
        if (label) {
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
      })
    );
  }

  findSameBreadcrumb(breadcrumb) {
    return this.breadcrumbs.find(
      b => b.urlParams[0] === breadcrumb.urlParams[0]
    );
  }

  createBreadcrumb({ label, route }) {
    const breadcrumb: BreadcrumbInterface = {
      label,
      urlParams: [route]
    };
    return breadcrumb;
  }

  getDynamicBreadcrumbLabel(breadcrumbRouteInfo): Observable<string> {
    if (breadcrumbRouteInfo && breadcrumbRouteInfo.dynamicKey === "courseId") {
      const { dynamicLabel, dynamicKey } = breadcrumbRouteInfo;
      return this.coursesData
        .getCourseById(this.activatedRoute.firstChild.snapshot.params.courseId)
        .pipe(
          map(targetCourse => {
            return targetCourse ? targetCourse[dynamicLabel] : "new";
          })
        );
    } else {
      return new Observable(subscriber =>
        subscriber.next(
          (breadcrumbRouteInfo && breadcrumbRouteInfo.label) || null
        )
      );
    }
  }
}

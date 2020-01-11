import { Component, OnInit, OnDestroy } from "@angular/core";
import { CoursesDataService } from "../../services/courses-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { JustCreatedCourse } from "src/app/domain/interfaces/just-created-course";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { CourseInterface } from "src/app/domain/interfaces/course";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-details-page.component.html",
  styleUrls: ["./course-details-page.component.scss"]
})
export class CourseDetailsPageComponent implements OnInit, OnDestroy {
  course: CourseInterface | JustCreatedCourse;
  routeParamsSubscription: Subscription;
  courseSubscription: Subscription;

  constructor(
    private dataService: CoursesDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{ courses: CourseInterface[] }>
  ) {}

  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      ({ courseId }) => {
        if (courseId === "new") {
          this.course = this.dataService.createDefaultCourseData();
          return;
        }
        this.courseSubscription = this.dataService
          .getCourseById(courseId)
          .subscribe(course => {
            this.course = course;
          });
      }
    );
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.courseSubscription && this.courseSubscription.unsubscribe();
  }

  goToCourses() {
    this.router.navigate(["courses"]);
  }
}

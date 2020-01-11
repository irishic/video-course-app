import { Component, OnInit, OnDestroy } from "@angular/core";
import { CoursesDataService } from "../../services/courses-data.service";
import { Store, select } from "@ngrx/store";
import { CourseInterface } from "src/app/domain/interfaces/course";
import { getStoreCourses, lastCourseIsLoaded } from "src/app/reducers";
import { map } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { loadCourses, loadMoreCourses } from "src/app/actions/courses.actions";

@Component({
  selector: "app-courses-page",
  templateUrl: "./courses-page.component.html",
  styleUrls: ["./courses-page.component.scss"]
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  coursesList: CourseInterface[];
  coursesSubscription: Subscription;
  lastLoadedSubscription: Subscription;
  searchValue: string;
  lastCoursesIntervalLoaded: boolean;

  constructor(
    private store: Store<{ courses: CourseInterface[] }>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadCourses());
    this.coursesSubscription = this.store
      .pipe(select(getStoreCourses))
      .subscribe(courses => {
        this.coursesList = courses || [];
      });
    this.lastLoadedSubscription = this.store
      .pipe(select(lastCourseIsLoaded))
      .subscribe(isLoaded => {
        this.lastCoursesIntervalLoaded = isLoaded;
      });
  }

  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
    this.lastLoadedSubscription.unsubscribe();
  }

  loadMoreCourses() {
    this.store.dispatch(loadMoreCourses({ startNum: this.coursesList.length }));
  }
}

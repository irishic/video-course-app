import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadCourses,
  loadMoreCoursesSuccess,
  filterByTitle,
  replaceCourseInStore
} from "../actions/courses.actions";
import { CoursesDataService } from "../modules/courses/services/courses-data.service";
import { map, exhaustMap } from "rxjs/operators";
import { updateCourse } from "src/app/actions/courses.actions";
import { Router } from '@angular/router';
import {
  loadCoursesSuccess,
  loadMoreCourses
} from "src/app/actions/courses.actions";

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCourses),
      exhaustMap(() => this.coursesDataService.initialCoursesLoad()),
      map(({ courses, isLast }) => {
        return loadCoursesSuccess({
          courses: this.coursesDataService.createCourses(courses),
          lastLoaded: isLast
        });
      })
    );
  });

  loadMoreCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMoreCourses),
      exhaustMap(({ startNum }) =>
        this.coursesDataService.loadMoreCourses(startNum)
      ),
      map(({ courses, isLast }) =>
        loadMoreCoursesSuccess({
          courses: this.coursesDataService.createCourses(courses),
          lastLoaded: isLast
        })
      )
    );
  });

  filterByTitle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(filterByTitle),
      exhaustMap(({ title }) => this.coursesDataService.searchByName(title)),
      map(({ courses }) =>
        loadCoursesSuccess({
          courses: this.coursesDataService.createCourses(courses),
          lastLoaded: true
        })
      )
    );
  });

  createUpdatedCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCourse),
      map(({ course }) => {
        this.router.navigateByUrl("/courses");
        return replaceCourseInStore({
          newInstance: this.coursesDataService.createCourse(course)
        });
      })
    );
  });

  constructor(
    private router: Router,
    private coursesDataService: CoursesDataService,
    private actions$: Actions
  ) {}
}

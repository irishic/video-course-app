import { Injectable } from "@angular/core";
import { CourseInterface } from "../../../domain/interfaces/course";
import { Course } from "../../../domain/models/course";
import { HttpClient } from "@angular/common/http";
import { CoursesListHttpResponse } from "src/app/domain/interfaces/courses-list-http-response";
import { Store, select } from "@ngrx/store";
import { getCourseById } from "src/app/reducers";
import {
  updateCourse,
  updateCoursesByIds
} from "src/app/actions/courses.actions";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CoursesDataService {
  courses: CourseInterface[];
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ courses: CourseInterface[] }>
  ) {}

  initialCoursesLoad() {
    return this.httpClient.get<CoursesListHttpResponse>(
      "http://localhost:3000/courses"
    );
  }

  getCourses() {
    return this.courses;
  }

  formatDate(date) {
    const dateObj = new Date(date);
    const month = this.leadingZero(dateObj.getMonth() + 1);
    const day = this.leadingZero(dateObj.getDate());
    return `${dateObj.getFullYear()}-${month}-${day}`;
  }

  leadingZero(value) {
    let copy = String(value);
    return copy.length === 1 ? `0${copy}` : copy;
  }

  createCourse(courseData?: CourseInterface) {
    const {
      id,
      title,
      creationDate,
      duration,
      description,
      topRated,
      authors
    } = courseData;

    return new Course(
      id,
      title,
      this.formatDate(creationDate),
      duration,
      description,
      topRated,
      authors
    );
  }

  createCourses(coursesData: CourseInterface[]) {
    return coursesData.map(course => this.createCourse(course));
  }

  createDefaultCourseData() {
    return {
      title: " ",
      creationDate: new Date(),
      duration: 0,
      description: " "
    };
  }

  getCourseById(id: string) {
    return this.store.pipe(select(getCourseById, { id }));
  }

  updateCourse(course, fieldsToUpdate) {
    const courseCopy: CourseInterface = { ...course, ...fieldsToUpdate };

    const requestObservable = courseCopy.id
      ? this.httpClient.put<CourseInterface>(
          `http://localhost:3000/course/${courseCopy.id}`,
          courseCopy
        )
      : this.httpClient.post<CourseInterface>(
          `http://localhost:3000/course/new`,
          courseCopy
        );

    return requestObservable.pipe(
      map(course => {
        return this.store.dispatch(updateCourse({ course }));
      })
    );
  }

  removeCourseById(courseId) {
    return this.httpClient
      .get<string[]>(`http://localhost:3000/delete-course/${courseId}`)
      .subscribe(existingCoursesIds => {
        this.store.dispatch(
          updateCoursesByIds({ coursesIds: existingCoursesIds })
        );
      });
  }

  loadMoreCourses(startNum: number) {
    return this.httpClient.get<CoursesListHttpResponse>(
      `http://localhost:3000/courses?start=${startNum + 1}&count=3`
    );
  }

  loadAuthorsNames(typed: string) {
    return this.httpClient
      .get<string[]>(`http://localhost:3000/authors?typed=${typed}`)
      .toPromise();
  }

  searchByName(value) {
    if (!value) {
      return this.initialCoursesLoad();
    }
    return this.httpClient.get<CoursesListHttpResponse>(
      "http://localhost:3000/search-course",
      {
        params: {
          searchByTitle: value
        }
      }
    );
  }
}

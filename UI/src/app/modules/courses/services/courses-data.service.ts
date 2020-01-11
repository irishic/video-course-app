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

  createCourse(courseData?: CourseInterface) {
    const {
      id,
      title,
      creationDate,
      duration,
      description,
      topRated
    } = courseData;
    return new Course(id, title, creationDate, duration, description, topRated);
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

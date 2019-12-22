import { Injectable } from "@angular/core";
import { CourseInterface } from "../../../domain/interfaces/course";
import { Course } from "../../../domain/models/course";
import { HttpClient } from "@angular/common/http";
import { CoursesListHttpResponse } from "src/app/domain/interfaces/courses-list-http-response";
import { LoadingBlockService } from "src/app/shared/services/loading-block.service";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CoursesDataService {
  courses: CourseInterface[];
  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingBlockService
  ) {}

  initialCoursesLoad() {
    return this.httpClient
      .get<CoursesListHttpResponse>("http://localhost:3000/courses")
      .pipe(
        map(({ courses, isLast }) => {
          return {
            courses: courses.map(course => this.createCourse(course)),
            isLast
          };
        }),
        tap(({ courses, isLast }) => {
          this.courses = courses;
          return { courses, isLast };
        })
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

  createDefaultCourseData() {
    return {
      title: " ",
      creationDate: new Date(),
      duration: 0,
      description: " "
    };
  }

  getCourseById(id: string) {
    return this.courses.find(course => {
      return course.id === id;
    });
  }

  updateCourse(courseId, fieldsToUpdate) {
    let course = this.getCourseById(courseId);

    course = { ...course, ...fieldsToUpdate };

    return courseId
      ? this.httpClient
          .put<CourseInterface>(
            `http://localhost:3000/course/${courseId}`,
            course
          )
          .toPromise()
      : this.httpClient
          .post<CourseInterface>(`http://localhost:3000/course/new`, course)
          .toPromise();
  }

  removeCourseById(courseId) {
    return this.httpClient
      .get<string[]>(`http://localhost:3000/delete-course/${courseId}`)
      .toPromise()
      .then(coursesIds => {
        this.courses = this.courses.filter(course =>
          coursesIds.includes(course.id)
        );
      });
  }

  loadMoreCourses() {
    return this.httpClient
      .get<CoursesListHttpResponse>(
        `http://localhost:3000/courses?start=${this.courses.length + 1}&count=3`
      )
      .pipe(
        map(response => {
          const { courses, isLast } = response;
          return { courses, isLast };
        }),
        tap(({ courses, isLast }) => {
          this.courses = this.courses.concat(
            courses.map(course => this.createCourse(course))
          );
          return isLast;
        })
      );
  }

  searchByName(value) {
    if (!value) {
      return this.initialCoursesLoad();
    }
    return this.httpClient
      .get<CoursesListHttpResponse>("http://localhost:3000/search-course", {
        params: {
          searchByTitle: value
        }
      })
      .pipe(
        map(response => response.courses),
        map(courses => {
          this.courses = courses.map(course => this.createCourse(course));
          return { courses: this.courses, isLast: true };
        })
      );
  }
}

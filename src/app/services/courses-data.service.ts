import { Injectable } from "@angular/core";
import fakeCourses from "./fake-courses-list";
import { CourseInterface } from "../domain/interfases/course";

@Injectable({
  providedIn: "root"
})
export class CoursesDataService {
  courses: CourseInterface[];
  constructor() {}

  getCourses() {
    this.courses = fakeCourses;
    return this.courses;
  }

  loadMoreCourses() {
    this.courses = this.courses.concat(this.courses.slice(0, 4));
    return this.courses;
  }

  searchByName(value) {
    if (!value) {
      return this.courses;
    }
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(value.toLowerCase())
    );
  }
}

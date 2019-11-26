import { Injectable } from "@angular/core";
import fakeCourses from "./fake-courses-list";
import { CourseInterface } from "../../../domain/interfaces/course";
import { Course } from "../../../domain/models/course";

@Injectable({
  providedIn: "root"
})
export class CoursesDataService {
  courses: CourseInterface[];
  constructor() {}

  initialCoursesLoad() {
    this.courses = fakeCourses.map(courseData => this.createCourse(courseData));
  }

  getCourses() {
    return this.courses;
  }

  getFreeId() {
    const ids = this.getCourses()
      .map(course => course.id)
      .sort();
    return ids[ids.length - 1] + 1;
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
    return new Course(
      id || this.getFreeId(),
      title,
      creationDate,
      duration,
      description,
      topRated
    );
  }

  createDefaultCourseData() {
    return {
      id: this.getFreeId(),
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

    if (course) {
      course = { ...course, ...fieldsToUpdate };
    } else {
      course = this.createCourse({ id: courseId, ...fieldsToUpdate });
      this.courses = [].concat([...this.courses, course]);
    }
    return course;
  }

  removeCourseById(courseId) {
    let course = this.getCourseById(courseId);
    this.removeCourse(course);
  }

  removeCourse(courseToRemove) {
    this.courses = this.courses.filter(course => course !== courseToRemove);
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

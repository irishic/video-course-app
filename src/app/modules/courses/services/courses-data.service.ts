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
    this.courses = fakeCourses;
  }

  getCourses() {
    return this.courses;
  }

  createCourse(courseData: CourseInterface) {
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

  getCourseById(id: string) {
    return this.courses.find(course => {
      return course.id === id;
    });
  }

  updateCourse(courseId, fieldsToUpdate) {
    let course = this.getCourseById(courseId);
    course = { ...course, ...fieldsToUpdate };
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

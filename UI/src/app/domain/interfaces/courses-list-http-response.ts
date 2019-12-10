import { CourseInterface } from "./course";

export interface CoursesListHttpResponse {
  courses: CourseInterface[];
  isLast: boolean;
}

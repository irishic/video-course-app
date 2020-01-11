import { Pipe, PipeTransform } from "@angular/core";
import { CourseInterface } from "../../../domain/interfaces/course";

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
  transform(
    array: [],
    key: string,
    ordering: string = "asc"
  ): any {
    return array.slice().sort((firstCourse, secondCourse) => {
      const firstCourseValue = firstCourse[key];
      const secondCourseValue = secondCourse[key];
      if (ordering === "asc") {
        return firstCourseValue > secondCourseValue ? 1 : -1;
      }
      if (ordering === "desc") {
        return firstCourseValue > secondCourseValue ? -1 : 1;
      }
    });
  }
}

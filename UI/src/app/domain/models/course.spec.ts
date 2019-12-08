import { Course } from "./course";
import { CourseInterface } from "../interfaces/course";

describe("Course", () => {
  it("should create an instance", () => {
    const course = new Course("1", "Title", new Date(), 12, "");
    expect(course).toBeTruthy();
  });
});

import { OrderByPipe } from "./order-by.pipe";
import { Course } from "../domain/models/course";

describe("OrderByPipe", () => {
  const course1 = new Course("1", "title", new Date(), 1, "description");
  const course2 = new Course("2", "title", new Date(), 2, "description");
  const pipe = new OrderByPipe();

  it("returns right asc order", () => {
    expect(pipe.transform([course1, course2], "duration", "asc")).toEqual([
      course1,
      course2
    ]);
  });
  it("returns right desc order", () => {
    expect(pipe.transform([course1, course2], "duration", "desc")).toEqual([
      course2,
      course1
    ]);
  });
});

import { CourseInterface } from "../interfases/course";

export class Course implements CourseInterface {
  constructor(
    public id: string,
    public title: string,
    public creationDate: Date,
    public duration: number,
    public description: string
  ) {}
}

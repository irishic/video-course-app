import { CourseInterface } from "../interfases/course";

export class Course implements CourseInterface {
  public id: string;
  public title: string;
  public creationDate: Date;
  public duration: number;
  public description: string;
  constructor(
    id: string,
    title: string,
    creationDate: Date,
    duration: number,
    description: string
  ) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
  }
}

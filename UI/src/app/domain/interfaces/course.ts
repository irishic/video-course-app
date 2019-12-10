import { UserInterface } from "./user";
import { JustCreatedCourse } from "./just-created-course";

export interface CourseInterface extends JustCreatedCourse {
  id: string;
}

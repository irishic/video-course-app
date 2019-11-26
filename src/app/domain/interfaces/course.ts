import { UserInterface } from "./user";
export interface CourseInterface {
  id: string;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated?: boolean;
  author?: UserInterface;
}

import { UserInterface } from "./user";

export interface JustCreatedCourse {
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated?: boolean;
  author?: UserInterface;
}

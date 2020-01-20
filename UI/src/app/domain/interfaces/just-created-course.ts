import { UserInterface } from "./user";

export interface JustCreatedCourse {
  title: string;
  creationDate: Date | string;
  duration: number;
  description: string;
  topRated?: boolean;
  authors?: string[];
}

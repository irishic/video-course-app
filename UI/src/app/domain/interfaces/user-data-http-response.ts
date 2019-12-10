import { UserInterface } from "./user";

export interface UserDataHttpResponse {
  accessToken: string;
  user: UserInterface;
}

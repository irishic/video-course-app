import { UserInterface } from "../interfaces/user";

export class User implements UserInterface {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string
  ) {}
}

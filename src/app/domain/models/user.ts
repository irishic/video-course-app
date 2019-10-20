import { UserInterface } from "../interfases/user";

export class User implements UserInterface {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string
  ) {}
}

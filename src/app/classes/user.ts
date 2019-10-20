import { UserInterface } from "../interfases/user";

export class User implements UserInterface {
  public id: string;
  public firstName: string;
  public lastName: string;

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

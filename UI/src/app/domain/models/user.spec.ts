import { User } from "./user";

describe("User", () => {
  it("should create an instance", () => {
    const user = new User("1", "first name", "last name", 'test@test.test');
    expect(user).toBeTruthy();
  });
});

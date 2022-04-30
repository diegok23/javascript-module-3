/**
 * Write the assertions using the .toBe() matcher
 */
describe("02-exercises", () => {
  test("the variable `hello` is the same as 'hello-world'", () => {
    const hello = "hello-world";

    expect.assertions(1);
    expect(hello).toBe("hello-world");

    // Finish the test
  });
  test("the variable `hello` is not the same as 'hola-mundo'", () => {
    const hello = "hello-world";

    expect.assertions(1);
    expect(hello).not.toBe("hola-mundo");

    // Finish the test
  });
  test("user1 is the same as user2", () => {
    expect.assertions(1);
    const user1 = { name: "ana", phone: 678876567 };
    const user2 = user1;

    // Finish the test
    expect(user2).toBe(user1)
  });
  test("user1 is not the same as user3", () => {
    
    const user1 = { name: "ana", phone: 678876567 };
    const user3 = { name: "ana", phone: 678876567 };
    
    // Finish the test
    expect(user1).not.toBe(user3)
  });
});

import getInsult from "../src/index";

it("gets an insult", () => {
  expect(getInsult({ insults: ["foo"] })).toBe("Foo");
});

it("repeats a phrase", () => {
  const insult = getInsult({
    insults: ["r{(s)[thing]} is r{(s)[thing]}"],
    thing: ["a", "b", "c", "d", "e"]
  });
  const possibilities = [
    "An a is an a",
    "A b is a b",
    "A c is a c",
    "A d is a d",
    "An e is an e"
  ];

  expect(possibilities.includes(insult)).toBe(true);
});

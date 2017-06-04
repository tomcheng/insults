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

it("respects weights", () => {
  const insults = [];
  const buckets = {
    insults: [
      { value: "a", weight: 100 },
      { value: "b", weight: 200 },
      { value: "c", weight: 300 }
    ]
  };
  for (let i = 0; i < 600; i++) {
    insults.push(getInsult(buckets));
  }

  const numberOfAs = insults.filter(i => i === "A").length;
  const numberOfBs = insults.filter(i => i === "B").length;
  const numberOfCs = insults.filter(i => i === "C").length;
  expect(numberOfAs).toBeGreaterThan(70);
  expect(numberOfAs).toBeLessThan(130);
  expect(numberOfBs).toBeGreaterThan(170);
  expect(numberOfBs).toBeLessThan(230);
  expect(numberOfCs).toBeGreaterThan(270);
  expect(numberOfCs).toBeLessThan(330);
});

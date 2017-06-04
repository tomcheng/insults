import getInsult, { ingify, addIndefiniteArticle, capitalize, pluralize, nounify } from "../src/index";

it("capitalizes", () => {
  expect(capitalize("foo")).toBe("Foo");
});

it("adds an indefinite article", () => {
  expect(addIndefiniteArticle("foo")).toBe("a foo");
  expect(addIndefiniteArticle("ant")).toBe("an ant");
  expect(addIndefiniteArticle("use")).toBe("a use");
  expect(addIndefiniteArticle("urine")).toBe("a urine");
  expect(addIndefiniteArticle("ump")).toBe("an ump");
});

it("pluralizes", () => {
  expect(pluralize("foo")).toBe("foos");
  expect(pluralize("fish")).toBe("fishes");
  expect(pluralize("case")).toBe("cases");
});

it("turns verbs to nouns", () => {
  expect(nounify("guzzle")).toBe("guzzler");
  expect(nounify("eat")).toBe("eater");
  expect(nounify("fist")).toBe("fister");
  expect(nounify("slap")).toBe("slapper");
  expect(nounify("poop")).toBe("pooper");
  expect(nounify("violate")).toBe("violator");
  expect(nounify("shit")).toBe("shitter");
});

it("turns words to -ing verbs", () => {
  expect(ingify("guzzle")).toBe("guzzling");
  expect(ingify("eat")).toBe("eating");
  expect(ingify("fist")).toBe("fisting");
  expect(ingify("slap")).toBe("slapping");
});

it("gets an insult", () => {
  expect(getInsult({ insults: ["foo"] })).toBe("Foo");
});

it("repeats a phrase", () => {
  const insult = getInsult({ insults: ["r{(s)[thing]} is r{(s)[thing]}"], thing: ["a","b","c","d","e"] });
  const possibilities = [
    "An a is an a",
    "A b is a b",
    "A c is a c",
    "A d is a d",
    "An e is an e",
  ];

  expect(possibilities.includes(insult)).toBe(true);
});

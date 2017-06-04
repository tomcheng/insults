import validateBuckets from "./validateBuckets";

it("returns true for valid buckets", () => {
  expect(validateBuckets({ insults: [""] })).toBe(true);
});

it("checks for missing buckets", () => {
  expect(validateBuckets({ insults: ["[foo]"] })).toBe(false);
});

it("checks for missing buckets recursively", () => {
  expect(validateBuckets({ insults: ["[foo]"], foo: ["[bar]"] })).toBe(false);
});

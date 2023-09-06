import { JSONPathEnvironment } from "../../src/path/environment";
import { JSONPathError } from "../../src/path/errors";

const testCase = {
  name: "functions, search, not a match",
  selector: "$[?search(@.a, 'a.*')]",
  document: [
    {
      a: "bc",
    },
  ],
  result: [],
};

describe("dev", () => {
  test(testCase.name, () => {
    const { name, selector, document, result } = testCase;
    const env = new JSONPathEnvironment();
    const path = env.compile(selector);
    const rv = path.query(document).values();
    expect(rv).toStrictEqual(result);
  });
});

// const invalidCase = {
//   name: "single quotes, invalid escaped double quote",
//   selector: "$['\\\"']",
//   invalid_selector: true,
// };

// describe("dev", () => {
//   test(invalidCase.name, () => {
//     const { selector } = invalidCase;
//     console.log(selector);
//     const env = new JSONPathEnvironment();
//     expect(() => env.compile(selector)).toThrow(JSONPathError);
//   });
// });

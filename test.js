import { parse, ARGUMENT } from "./parse-args.js";
import { isEqual } from "./modules/assert.js";
import testsuite from "./modules/testsuite.js";

const { test, run } = testsuite("parse");

test("single flags", () => {
  const actual = Array.from(parse(["-foo", "-bar", "-baz"]));
  const expected = [
    ["foo", null],
    ["bar", null],
    ["baz", null],
  ];
  isEqual(actual, expected);
});

test("single arguments", () => {
  const actual = Array.from(parse(["foo", "bar", "baz"]));
  const expected = [
    [ARGUMENT, "foo"],
    [ARGUMENT, "bar"],
    [ARGUMENT, "baz"],
  ];
  isEqual(actual, expected);
});

test("flags with arguments", () => {
  const actual = Array.from(
    parse(["-foo", "bar", "baz", "-bar", "foo", "baz"])
  );
  const expected = [
    ["foo", "bar"],
    ["foo", "baz"],
    ["bar", "foo"],
    ["bar", "baz"],
  ];
  isEqual(actual, expected);
});

test("flags with double dash", () => {
  const actual = Array.from(
    parse(["--foo", "bar", "baz", "--bar", "foo", "baz"])
  );
  const expected = [
    ["foo", "bar"],
    ["foo", "baz"],
    ["bar", "foo"],
    ["bar", "baz"],
  ];
  isEqual(actual, expected);
});
run();

// function isEqual(actual, expected) {
//   const type = typeof actual;
//   if (type !== typeof expected) throw new Error("is not equal");
//
//   if (type === "symbol") {
//     if (actual.toString() !== expected.toString()) {
//       throw new Error("is not equal");
//     }
//     return;
//   }
//
//   if (type !== "object") {
//     if (actual !== expected) {
//       throw new Error("is not equal");
//     }
//     return;
//   }
//
//   if (actual.length !== expected.length) throw new Error("is not euqual");
//
//   let i = 0;
//   const l = actual.length;
//   for (; i < l; i++) {
//     isEqual(actual[i], expected[i]);
//   }
// }
//
// function testsuite(name) {
//   const tests = new Map();
//   return {
//     test: (desc, test) => tests.set(desc, test),
//     run: () => {
//       console.log(`Run suite ${name}`);
//       let passed = 0;
//       let failed = 0;
//       for (const [desc, test] of tests.entries()) {
//         try {
//           test();
//           passed++;
//           out.puts(`  Test ${desc} ... passed\n`);
//         } catch (e) {
//           failed++;
//           err.puts(`  Test ${desc} ... failed\n`);
//         }
//       }
//       console.log(`${passed} passed / ${failed} failed`);
//       exit(failed ? 1 : 0);
//     },
//   };
// }

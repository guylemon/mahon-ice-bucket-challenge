import assert from "assert";
import { compose, reduce, sort } from "./functional";
import {
  compareIntervals,
  reducer,
  slidingWindow,
  stackAccumulate,
} from "./logic";

import type { Cases, Interval } from "./types";

/**
 * @description
 * Use sort and reduce to solve the challenge cases
 */
const bruteForce = compose(
  reduce<Interval, Interval>(reducer, []),
  sort<Interval>(compareIntervals)
);

/**
 * @description
 * Use a 'stack' to solve the challenge cases
 */
const stackApproach = compose(
  stackAccumulate,
  sort<Interval>(compareIntervals)
);

/**
 * @description
 * Use a 'sliding window' to solve the challenge cases
 */
const slidingWindowApproach = compose(
  slidingWindow,
  sort<Interval>(compareIntervals)
);

// Minimal test cases
const cases: Cases = {
  // Unsorted
  a: {
    input: [
      [1, 3],
      [31, 60],
      [8, 10],
      [29, 51],
      [15, 18],
      [3, 7],
    ],
    expected: [
      [1, 7],
      [8, 10],
      [15, 18],
      [29, 60],
    ],
  },
  // Identical to case `a`, with merged intervals spanning more than
  // two intervals
  b: {
    input: [
      [1, 3],
      // duplicate intervals should be merged
      [1, 3],
      [31, 60],
      [33, 44],
      [8, 10],
      [29, 51],
      [16, 17],
      [15, 18],
      // discard the 'right' interval when the 'left' contains it.
      // [33, 44], [29,51], [31,60] should be merged to [29,60]
      // [29, 51] + [31,60] = [29, 60] (right interleaves with left)
      // [29, 60] + [33, 44] = [29, 60] (left contains right)
      [33, 44],
      [33, 44],
      [3, 7],
    ],
    expected: [
      [1, 7],
      [8, 10],
      [15, 18],
      [29, 60],
    ],
  },
  // Example 1
  c: {
    input: [
      [1, 3],
      [2, 6],
    ],
    expected: [[1, 6]],
  },
  // Example 2
  d: {
    input: [
      [1, 3],
      [3, 5],
      [15, 18],
      [16, 19],
    ],
    expected: [
      [1, 5],
      [15, 19],
    ],
  },
};

// Tests
for (const c of Object.values(cases)) {
  // NOTE: use spread operator to avoid mutating the test cases
  assert.deepStrictEqual(bruteForce([...c.input]), c.expected);
  assert.deepStrictEqual(stackApproach([...c.input]), c.expected);
  assert.deepStrictEqual(slidingWindowApproach([...c.input]), c.expected);
}

console.log("Tests passed!");

// Output for human enjoyment
for (const c of Object.values(cases)) {
  console.log({
    ...c,
    // NOTE: use spread operator to avoid mutating the test cases
    bruteForce: bruteForce([...c.input]),
    stackApproach: stackApproach([...c.input]),
    slidingWindowApproach: slidingWindowApproach([...c.input]),
  });
}

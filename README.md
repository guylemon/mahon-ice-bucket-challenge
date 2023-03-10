# The Mahon ice bucket challenge

## Overview

This repository contains a typescript implementation of the Mahon interval merge challenge and demonstrates three solution approaches: a) sort -> reduce, b) sort -> stack, and c) sort -> sliding window. See the [challenge description](#challenge-description)  and [approach descriptions](#approach) for more information.

### How to run the code:

Have `git`, `node`, and `npm` available in your path, and run the following in the terminal application of your choice:

```bash
git clone https://github.com/guylemon/mahon-ice-bucket-challenge.git && cd mahon-ice-bucket-challenge

npm ci && npm run interview
```

You should see output similar to the following:

```txt
Tests passed!
{
  input: [ [ 1, 3 ], [ 31, 60 ], [ 8, 10 ], [ 29, 51 ], [ 15, 18 ], [ 3, 7 ] ],
  expected: [ [ 1, 7 ], [ 8, 10 ], [ 15, 18 ], [ 29, 60 ] ],
  bruteForce: [ [ 1, 7 ], [ 8, 10 ], [ 15, 18 ], [ 29, 60 ] ],
  stackApproach: [ [ 1, 7 ], [ 8, 10 ], [ 15, 18 ], [ 29, 60 ] ],
  slidingWindowApproach: [ [ 1, 7 ], [ 8, 10 ], [ 15, 18 ], [ 29, 60 ] ]
}
{
  input: [
    [ 1, 3 ],   [ 1, 3 ],
    [ 31, 60 ], [ 8, 10 ],
    [ 29, 51 ], [ 15, 18 ],
    [ 33, 44 ], [ 33, 44 ],
    [ 3, 7 ]
  ],
  expected: [ [ 1, 7 ], [ 8, 10 ], [ 15, 18 ], [ 29, 60 ] ],
  bruteForce: [ [ 1, 7 ], [ 8, 10 ], [ 15, 18 ], [ 29, 60 ] ],
  stackApproach: [ [ 1, 7 ], [ 8, 10 ], [ 15, 18 ], [ 29, 60 ] ],
  slidingWindowApproach: [ [ 1, 7 ], [ 8, 10 ], [ 15, 18 ], [ 29, 60 ] ]
}
{
  input: [ [ 1, 3 ], [ 2, 6 ] ],
  expected: [ [ 1, 6 ] ],
  bruteForce: [ [ 1, 6 ] ],
  stackApproach: [ [ 1, 6 ] ],
  slidingWindowApproach: [ [ 1, 6 ] ]
}
{
  input: [ [ 1, 3 ], [ 3, 5 ], [ 15, 18 ], [ 16, 19 ] ],
  expected: [ [ 1, 5 ], [ 15, 19 ] ],
  bruteForce: [ [ 1, 5 ], [ 15, 19 ] ],
  stackApproach: [ [ 1, 5 ], [ 15, 19 ] ],
  slidingWindowApproach: [ [ 1, 5 ], [ 15, 19 ] ]
}
```

### Files

I recommend viewing the files in a typescript friendly editor, e.g., Visual Studio Code.

- `index.ts` The entry point and test home.
- `logic.ts` The algorithms for all approaches.
- `functional.ts` Utility functions for functional composition

## Challenge Description

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Example 1

> **Input**: `[[1,3],[2,6]]` <br/>
> **Output**: `[[1,6]]`
>
> _Since intervals `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`._

### Example 2

> **Input**: intervals = `[[1,3],[3,5],[15,18], [16,19]]`  <br/>
> **Output**: `[[1, 5], [15, 19]]`
>
> _Explanation: Intervals `[1,3]` and `[3,5]` overlap._

### Example 3

> **Input**: `[[1,3], [31,60], [8,10], [29,51], [15,18], [3,7]]` <br/>
> **Output**: `[[1, 7], [8,10], [15,18], [29,60]]`
> 
> _Explanation: After sorting the input, the algorithm will merge all intervals except `[8,10]` and `[15,18]`._

---

## Approach

0. Assume that all test input conforms to the following type:

    ```typescript
    type input = [number, number][]
    ```

1. Sort the input before processing. Use the native `Array` sort method, which uses `timsort` [1] with an average time complexity of `O(nlogn)`.

    _[1] https://v8.dev/blog/array-sort_

2. Merge intervals _A_ and _B_ in _I_ when they meet all of the following conditions:

    > 1. _A[1] >= B[0]_
    > 2. _A[1] <= B[1]_

3. Discard interval _B_ when interval _A_ contains _B_. For example:

   > let _A = [1, 5]_, and _B = [2,3]_. <br/>
   > Interval _A_ contains _B_.

4. For the sake of time, do not include exhaustive test cases. It could be interesting to 'fuzz' the functions with property-based testing, e.g., https://github.com/dubzzz/fast-check.

5. Make it fun with TypeScript and functional composition!

---

### Brute force

1. Sort the array.
2. Use `Array.prototype.reduce` to accumulate the overlapping intervals.

### Stack

1. Sort the array.
2. Accumulate overlapping intervals while building a stack (simulated with JavaScript array) from the sorted array.

### Sliding window

1. Sort the array.
2. Use a sliding window to accumulate overlapping intervals.

import type { Interval } from "./types";

/**
 * @description Compare function for array.sort when sorting the input array
 */
export function compareIntervals(startA: Interval, startB: Interval) {
  return startA[0] - startB[0];
}

/**
 * @description A shared predicate for all solution variations.
 *
 * Tuple A interleaves with tuple B when:
 *    A's end time is greater than or equal to B's start time,
 *    and A's end time is less than or equal to B's end time
 */
function intervalsInterleave(left?: Interval, right?: Interval) {
  if (left === undefined || right === undefined) {
    return false;
  }

  const [, endA] = left;
  const [startB, endB] = right;

  return endA >= startB && endA <= endB;
}

/**
 * @description A shared predicate for all solution variations.
 * Tuple A contains tuple B when:
 *    B's start time is greater than or equal to A's start time,
 *    and B's end time is less than or equal to A's end time
 */
function leftContainsRight(left: Interval, right: Interval) {
  if (left === undefined || right === undefined) {
    return false;
  }

  const [startA, endA] = left;
  const [startB, endB] = right;

  return startB >= startA && endB <= endA;
}

/**
 * @description Move a 'window' (two index pointers) across the
 * array, and merge the intervals when possible.
 */
export function slidingWindow(intervals: Interval[]): Interval[] {
  let mergedIntervals: Interval[] = [];
  // the 'window' starts closed
  let L = 0;
  let R = 0;

  while (R < intervals.length) {
    // initialize pointers
    let left = intervals[L];
    let right = intervals[R];

    // initialize the 'merged' interval to the left hand side.
    let merged = left;

    // 1. While possible, open the window to accumulate interleaving intervals
    // 2. Merge the left and right intervals
    while (intervalsInterleave(left, right)) {
      // merge the overlapping interval
      merged = [left[0], right[1]];

      // expand the window
      R++;
      right = intervals[R];
    }

    // Discard intervals on the right that are contained by the left side.
    while (leftContainsRight(left, right)) {
      // Slide the right bound forward to skip the contained interval.
      R++;
      right = intervals[R];
    }

    mergedIntervals.push(merged);
    // Slide the left bound forward to 'close' the window
    // before the next round.
    L = R;
    R++;
  }

  return mergedIntervals;
}

/**
 * @description Algorithm to merge overlapping intervals with a
 * "stack building" approach.
 */
export function stackAccumulate(intervals: Interval[]): Interval[] {
  let stack: Interval[] = [];

  const peekStack = (s: Interval[]) => (s.length > 0 ? s[s.length - 1] : null);

  for (const interval of intervals) {
    const left = peekStack(stack);
    const right = interval;

    // Handle the empty stack
    if (left === null) {
      stack.push(right);
      continue;
    }

    // Discard intervals contained by the left side.
    if (leftContainsRight(left, right)) {
      continue;
    }

    if (intervalsInterleave(left, right)) {
      // Avoid casting to `Interval` in the push statement
      const merged: Interval = [left[0], right[1]];

      // remove the overlapping item from the stack
      stack.pop();

      // add the merged item to the stack
      stack.push(merged);
      continue;
    }

    stack.push(interval);
  }

  return stack;
}

/**
 * @description Used with Array.prototype.reduce to
 * accumulate overlapping intervals in the "brute force" approach.
 */
export function reducer(acc: Interval[], currentInterval: Interval) {
  // Handle the empty accumulator
  if (acc.length < 1) {
    return [currentInterval];
  }

  const left = acc[acc.length - 1];
  const right = currentInterval;

  // Skip intervals contained by the left side.
  if (leftContainsRight(left, right)) {
    return acc;
  }

  if (intervalsInterleave(left, right)) {
    // Merge the intervals.
    // Avoid casting to `Interval` in the return statement
    const merged: Interval = [left[0], right[1]];

    // remove the overlapping item (meh)
    acc.pop();

    return [...acc, merged];
  }

  return [...acc, right];
}

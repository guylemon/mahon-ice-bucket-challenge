/*
 * A minimal set of functional-style utilities to support the following:
 * - curried array sort
 * - curried array reduce
 * - functional composition
 */

// curried array.sort
export function sort<T>(compareFn: (a: T, b: T) => number): (arr: T[]) => T[] {
  return (arr) => arr.sort(compareFn);
}

// curried array.reduce
export function reduce<T, U>(
  fn: (acc: U[], x: T) => U[],
  acc: U[]
): (arr: T[]) => U[] {
  return (arr) => arr.reduce(fn, acc);
}

// variadic compose
// Note: This is not perfectly typed, but works for this challenge.
export function compose<T, U extends T>(...fns: ((x: T) => U)[]) {
  return fns.reduce((f, g) => (x: T) => f(g(x)));
}

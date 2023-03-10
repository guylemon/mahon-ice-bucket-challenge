export type Interval = [number, number];

export type Cases = {
  [key: string]: {
    input: Interval[];
    expected: Interval[];
  };
};

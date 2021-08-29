export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const pick = (arr: Array<any>): any =>
  arr[Math.floor(Math.random() * arr.length)];

export const pickItems = (arr: Array<any>, n: number = 1): Array<any> =>
  arr.sort(() => 0.5 - Math.random()).slice(0, n);

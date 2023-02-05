import { message as STATUS_CODES } from 'statuses';
import myCodes from 'statuses/codes.json';
export {};

function strEnum<T extends string>(o: T[]): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
const codes = Object.values(STATUS_CODES).map((c) => _.camelCase(c)) as const;

const myenum = strEnum(codes) as const;

// const test = STATUS_CODES;

declare global {
  namespace Express {
    // what is  a namespace/ what is declare
    export interface Response {
      idada?: string;
      // [key: string]: string;
      // [K: (typeof STATUS_CODES)[keyof typeof STATUS_CODES]]: string;
      [K: keyof typeof myCodes]: string;
    }
  }
}

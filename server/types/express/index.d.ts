import type STATUS_CODES from './responses.json';

export {};

type ReplyMethod = (
  data?: Record<string, unknown>,
  message?: string | string[],
) => void;

type SafeResponseNames = Record<keyof typeof STATUS_CODES, ReplyMethod>;
declare global {
  namespace Express {
    export interface Response extends SafeResponseNames {}
  }
}

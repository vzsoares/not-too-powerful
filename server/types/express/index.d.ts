import type STATUS_CODES from './responses.json';

export {};

type ReplyMethod = (
  data?: unknown | null,
  message?: unknown | null,
  code?: unknown | null,
  error?: unknown | null,
) => void;

export type SafeResponseNames = Record<keyof typeof STATUS_CODES, ReplyMethod>;
declare global {
  namespace Express {
    export interface Response extends SafeResponseNames {}
  }
}

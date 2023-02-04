
import { Express } from 'express'


declare global{
  namespace Express {
    export interface Response {
      currentUser: string;
    }
  }
}
export {}
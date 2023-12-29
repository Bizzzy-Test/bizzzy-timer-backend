/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from 'jsonwebtoken';
import { AuthPayload } from './auth';

declare global {
  namespace Express {
    interface Request {
      user: AuthPayload;
    }
  }
}

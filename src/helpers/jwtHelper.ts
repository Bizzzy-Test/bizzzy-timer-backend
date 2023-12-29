/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { AuthPayload } from '../interfaces/auth';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): AuthPayload => {
  return jwt.verify(token, secret) as AuthPayload;
};

export const jwtHelper = {
  createToken,
  verifyToken,
};

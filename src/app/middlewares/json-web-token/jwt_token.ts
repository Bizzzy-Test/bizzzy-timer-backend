import jwt from 'jsonwebtoken';
import responseData from '../../constants/responses';

// Assuming the structure of your user object, adjust it as needed
interface User {
    _id: string;
    email: string;
    role: string;
}

function generateToken(user: User, rememberMe: boolean): string {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    let options = {};
    if (!rememberMe) {
        options = {
            expiresIn: '24h' // Token will expire in 24 hours
        };
    }

    const token = jwt.sign(payload, SECRET_KEY, options);
    return token;
}

// Assuming req, res, and next have the types from Express
import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '../../../interfaces/auth';

function validateToken(req: Request, res: Response, next: NextFunction, userToken: string = ''): void {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        if (!jwtSecretKey) {
            throw new Error('JWT_SECRET_KEY is not defined in environment variables');
        }

        const token = req.header('token') || userToken;
        if (token) {
            const verified = jwt.verify(token, jwtSecretKey) as AuthPayload ;
            if (verified) {
                req.user = verified;
                next();
            } else {
                res.status(401).send(responseData.unauthorized);
            }
        } else {
            res.status(400).send(responseData.tokenRequired);
        }
    } catch (error) {
        res.status(401).send(responseData.unauthorized);
    }
}

export { generateToken, validateToken };

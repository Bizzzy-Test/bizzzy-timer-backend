/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { encryptData } from '../../middlewares/cryptography/encryption_decryption';
import { generateToken } from '../../middlewares/json-web-token/jwt_token';
import { User } from '../user/user.model';

const signIn = async (body: any, res: any): Promise<any> => {
  try {
    body['password'] = encryptData(body.password);
    const user = await User.findOne({
        email: body.email
    });
    if (user) {
        if (!user.is_email_verified) {
            throw new Error("Your Email is not verified")
        }
        if (user.password === body.password) {
            const token = generateToken({_id: user._id.toString(), email: user.email, role: user.role.toString()}, false);
            return { id: user._id, token, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}` };
        } else {
            throw new Error("Email or Password is incorrect")
        }
    } else {
        throw new Error("User not found with this email")
        // return responseData.fail(res, messageConstants.EMAIL_NOT_FOUND, 403);
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};

export const authService = {
    signIn,
};


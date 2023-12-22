import { Model } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";

export type ISocialLogin = {
    provider: 'facebook' | 'google' | 'apple';
    id: string;
}

export type IUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: ENUM_USER_ROLE;
    country?: string;
    social_logins: ISocialLogin[];
    email_verification_token?: string;
    is_email_verified: boolean;
    send_promo_emails: boolean;
    has_accepted_terms: boolean;
    date_registered: Date;
    password_reset_token?: {
        token: string;
        expires: Date;
    };
    last_login: Date;
    created_at: Date;
    updated_at: Date;
    is_deleted: boolean;
    status: number;
}

export type SocialModel = Model<ISocialLogin, Record<string, unknown>>

export type UserModel = Model<IUser, Record<string, unknown>>;


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
    socialLogins: ISocialLogin[];
    emailVerificationToken?: string;
    isEmailVerified: boolean;
    sendPromoEmails: boolean;
    hasAcceptedTerms: boolean;
    dateRegistered: Date;
    passwordResetToken?: {
        token: string;
        expires: Date;
    };
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    status: number;
}

export type SocialModel = Model<ISocialLogin, Record<string, unknown>>

export type UserModel = Model<IUser, Record<string, unknown>>;


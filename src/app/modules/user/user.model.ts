import { Schema, model } from 'mongoose';
import { ISocialLogin, IUser, SocialModel, UserModel } from './user.interface';
import { ENUM_USER_ROLE } from '../../../enums/user';

const socialLoginSchema = new Schema<ISocialLogin, SocialModel>({
    provider: {
        type: String,
        enum: ['facebook', 'google', 'apple'],
        required: true
    },
    id: {
        type: String,
        required: true
    }
});


const userSchema = new Schema<IUser, UserModel>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        enum: [
            ENUM_USER_ROLE.FREELANCER,
            ENUM_USER_ROLE.CLIENT,
            ENUM_USER_ROLE.ADMIN
        ],
        required: true
    },
    country: {
        type: String,
    },
    socialLogins: [socialLoginSchema],
    emailVerificationToken: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    sendPromoEmails: {
        type: Boolean,
        default: false
    },
    hasAcceptedTerms: {
        type: Boolean,
        default: false
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    passwordResetToken: {
        token: String,
        expires: Date
    },
    lastLogin: {
        type: Date
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        required: true,
        default: 1
    }
})

export const User = model<IUser, UserModel>('users', userSchema)

export const SocialLogin = model<ISocialLogin, SocialModel>('SocialLogin', socialLoginSchema);
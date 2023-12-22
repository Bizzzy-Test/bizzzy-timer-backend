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
    social_logins: [socialLoginSchema],
    email_verification_token: {
        type: String
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    send_promo_emails: {
        type: Boolean,
        default: false
    },
    has_accepted_terms: {
        type: Boolean,
        default: false
    },
    date_registered: {
        type: Date,
        default: Date.now
    },
    password_reset_token: {
        token: String,
        expires: Date
    },
    last_login: {
        type: Date
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    is_deleted: {
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
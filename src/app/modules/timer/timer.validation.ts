import { z } from 'zod';

const createTimerZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'title is required',
        }),
        description: z.string({
            required_error: 'description is required',
        }),
        time: z.string({
            required_error: 'time is required',
        }),
        status: z.string({
            required_error: 'status is required',
        }),
        userId: z.string({
            required_error: 'userId is required',
        }),
    }),
});



export const AuthValidation = {
    createTimerZodSchema
};
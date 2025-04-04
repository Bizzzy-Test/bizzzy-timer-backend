import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
// import { ITimer } from './auth.interface';
import { authService } from './auth.service';


const signIn: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const response = await authService.signIn(req.body, res);
    sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SignIn successfully!',
    data: response,
  });
});

export const AuthController = {
    signIn,
};
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import UserServce from './user.service'

const UploadImage: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await UserServce.UploadImage(req, res);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'upload image successfully!',
        data: result,
    });
});



export const UserController = {
    UploadImage,
    
}
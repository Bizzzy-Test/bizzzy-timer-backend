import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
// import { ITimer } from './auth.interface';
import { jobService } from './job.service';


const getJobs: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const response = await jobService.getJobs(req.userId, res);
    sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Jobs successfully!',
    data: response,
  });
});

export const JobController = {
  getJobs,
};
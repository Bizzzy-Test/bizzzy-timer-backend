import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ITimer } from './timer.interface';
import { timerService } from './timer.service';


const StartTimer: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.body?.userId;
  const result = await timerService.startTimer(userId);
  sendResponse<ITimer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'timer start successfully!',
    data: result,
  });
});

const StopTimer: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const result = await timerService.stopTimer(userId);
  sendResponse<ITimer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'timer stop successfully!',
    data: result,
  });
});

// upload screenshot
const UploadScreenshot: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const jobId = req.body.jobId;
  const file = req.file;

  const result = await timerService.uploadScreenshot(userId, jobId, file);

  sendResponse<ITimer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'screenshot upload successfully!',
    data: result,
  });
});

// today timer report for specific user and specific job

const TodayTimerReport: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await timerService.todayTimerReport(data);
  sendResponse<ITimer[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'today timer report successfully!',
    data: result,
  });
});



export const TimerController = {
  StartTimer,
  StopTimer,
  TodayTimerReport,
  UploadScreenshot
};
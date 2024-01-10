import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ITimer } from './timer.interface';
import { timerService } from './timer.service';
import { uploadFile } from '../../middlewares/aws/aws';


const StartTimer: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const body = req?.body;
  const result = await timerService.startTimer(userId, body);
  sendResponse<ITimer| any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'timer start successfully!',
    data: result,
  });
});

// const StopTimer: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.body.userId;
//   const result = await timerService.stopTimer(userId);
//   sendResponse<ITimer>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'timer stop successfully!',
//     data: result,
//   });
// });

// upload screenshot
 
const UploadScreenshot: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const timerData = req.body;
  let fileUrl;
  if (req.file) {
    const fileBuffer = req.file.buffer;
    const folderName = "timer_screenshots";
    fileUrl = await uploadFile(fileBuffer, req.file.originalname, req.file.mimetype, folderName);
  }
  timerData.file = fileUrl || "null";
  const result = await timerService.uploadScreenshot(timerData);

  sendResponse<ITimer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Screenshot uploaded successfully!',
    data: result,
  });
});


// today timer report for specific user and specific job

// const TodayTimerReport: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//   const data = req.body;
//   const result = await timerService.todayTimerReport(data);
//   sendResponse<ITimer[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'today timer report successfully!',
//     data: result,
//   });
// });



export const TimerController = {
  StartTimer,
  // StopTimer,
  // TodayTimerReport,
  UploadScreenshot
};
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ITimer } from './timer.interface';
import { timerService } from './timer.service';
import { uploadFile } from '../../middlewares/aws/aws';

const StartTimer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req?.user?.id;
    const body = req?.body;
    const result = await timerService.startTimer(userId, body);
    sendResponse<ITimer | any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'timer start successfully!',
      data: result,
    });
  }
);

const EndTimer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req?.user?.id;
    const body = req?.body;
    const result = await timerService.endTimer(userId, body);
    sendResponse<ITimer | any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'timer end successfully!',
      data: result,
    });
  }
);

// ==== upload image
const UploadScreenshot: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const timerData = req.body;
    const freelancer_id = req.user.id;
    let fileUrl;
    if (req.file) {
      const fileBuffer = req.file.buffer;
      const folderName = 'timer_screenshots';
      fileUrl = await uploadFile(
        fileBuffer,
        req.file.originalname,
        req.file.mimetype,
        folderName
      );
    }
    timerData.file = fileUrl || 'null';

    const result = await timerService.uploadScreenshot(
      timerData,
      freelancer_id
    );

    sendResponse<ITimer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Screenshot uploaded successfully!',
      data: result,
    });
  }
);

// ==== Get Daily Report
const getDailyReport: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const freelancer_id = req.user.id;
    const job_id = req.params.job_id;

    const result = await timerService.getDailyReport(freelancer_id, job_id);
    sendResponse<ITimer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Daily Report Fetch Successfully!',
      data: result,
    });
  }
);

// ==== Get Weekly Report
const getWeeklyReport: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const freelancer_id = req.user.id;
    const job_id = req.params.job_id;

    const result = await timerService.getWeeklyReport(freelancer_id, job_id);
    sendResponse<ITimer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Weekly Report Fetch Successfully!',
      data: result,
    }); 
  }
);

// ==== Get Monthly Report
const getMonthlyReport: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const freelancer_id = req.user.id;
    const job_id = req.params.job_id;

    const result = await timerService.getMonthlyReport(freelancer_id, job_id);
    sendResponse<ITimer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Monthly Report Fetch Successfully!',
      data: result,
    }); 
  }
);


export const TimerController = {
  StartTimer,
  EndTimer,
  UploadScreenshot,
  getDailyReport,
  getWeeklyReport,
  getMonthlyReport
};

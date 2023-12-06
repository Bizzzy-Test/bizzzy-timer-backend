/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timer } from './timer.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ITimer } from './timer.interface';
import { uploadFile } from '../../middlewares/aws/aws';

const formatDuration = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} hrs ${mins} min`;
};

const startTimer = async (userId: string): Promise<ITimer> => {
  try {
    const todayStart = new Date().setHours(0, 0, 0, 0);
    let timer = await Timer.findOne({ userId: userId, date: { $gte: todayStart } });

    if (!timer) {
      timer = new Timer({ userId, startTime: [new Date()], isActive: true });
    } else {
      timer.startTime.push(new Date());
      timer.isActive = true;
    }

    await timer.save();
    return timer;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};


const stopTimer = async (userId: string): Promise<ITimer> => {
  try {
    const todayStart = new Date().setHours(0, 0, 0, 0);

    const timer = await Timer.findOne({
      userId,
      startTime: { $gte: todayStart },
      isActive: true,
    });

    if (!timer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No active timer found');
    }

    if (!timer.endTime) {
      timer.endTime = [];
    }

    timer.endTime.push(new Date());
    timer.isActive = false;

    // Calculate total duration
    let totalDuration = 0;
    timer.startTime.forEach((start, index) => {
      const end = timer.endTime[index];
      if (end) {
        totalDuration += end.getTime() - start.getTime();
      }
    });

    timer.duration = formatDuration(totalDuration);
    await timer.save();
    return timer;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};

// upload screenshot
const uploadScreenshot = async (payload: string): Promise<ITimer> => {
  try {
    console.log(payload, "payload++++++++")

    const timerSceenshot = new Timer(payload);
    const data = await timerSceenshot.save();
    return data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};


// get today timer report for specific user and specific job

const todayTimerReport = async (data: any): Promise<ITimer[]> => {
  try {
    const { userId, jobId } = data;
    // Get the current date and set it to the start of the day
    const todayStart = new Date().setHours(0, 0, 0, 0);

    // Find all timers for the specific user, job, and date
    const timers = await Timer.find({
      userId,
      jobId,
      date: { $gte: todayStart },
    });

    // Calculate the total duration for each timer
    const timersWithDurations = timers.map((timer) => {
      let totalDuration = 0;
      timer.startTime.forEach((start, index) => {
        const end = timer.endTime[index];
        if (end) {
          totalDuration += end.getTime() - start.getTime();
        }
      });

      return {
        ...timer.toObject(),
        duration: formatDuration(totalDuration),
      };
    });

    return timersWithDurations;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};

export const timerService = {
  startTimer,
  stopTimer,
  todayTimerReport,
  uploadScreenshot
};


import { ObjectId } from 'bson';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ITimer, IUploadFile } from './timer.interface';
import { Timer } from './timer.model';
// import { uploadFile } from '../../middlewares/aws/aws';

const formatDuration = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} hrs ${mins} min`;
};

// const startTimer = async (userId: string, body: any): Promise<ITimer | any> => {
//   try {
//     let { job_id, client_id } = body;
//     let timer = await Timer.findOne({
//       job_id,
//       freelancer_id: userId,
//       client_id,
//     });

//     if (!timer) {
//       // create Object in timer
//       let saveObject = {
//         job_id,
//         freelancer_id: userId,
//         client_id,
//         timer: [
//           {
//             start_time: Date.now(),
//           },
//         ],
//         screenshots: [],
//         start_date: new Date().setHours(0, 0, 0, 0),
//       };
//       timer = new Timer(saveObject);
//       await timer.save();
//       return null;
//     } else {
//       const updatedTimer = await Timer.updateOne(
//         {
//           job_id: new ObjectId(job_id),
//           freelancer_id: new ObjectId(userId),
//           client_id: new ObjectId(client_id),
//         },
//         {
//           $push: {
//             timer: {
//               start_time: Date.now(),
//             },
//           },
//         },
//         { new: true, upsert: false } // options
//       );
//       return null;
//     }
//   } catch (error) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
//   }
// };

const startTimer = async (userId: string, body: any): Promise<ITimer | any> => {
  try {
    let { job_id, client_id } = body;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let timer = await Timer.findOne({
      job_id,
      freelancer_id: userId,
      client_id,
      start_date: startOfDay,
    });

    if (!timer) {
      // create Object in timer
      let saveObject = {
        job_id,
        freelancer_id: userId,
        client_id,
        timer: [
          {
            start_time: Date.now(),
          },
        ],
        screenshots: [],
        start_date: startOfDay,
      };
      timer = new Timer(saveObject);
      await timer.save();
      return null;
    } else {
      const updatedTimer = await Timer.updateOne(
        {
          job_id: new ObjectId(job_id),
          freelancer_id: new ObjectId(userId),
          client_id: new ObjectId(client_id),
          start_date: startOfDay,
        },
        {
          $push: {
            timer: {
              start_time: Date.now(),
            },
          },
        },
        { new: true, upsert: false } // options
      );
      return null;
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};


const endTimer = async (userId: string, body: any): Promise<ITimer | any> => {
  try {
    let { job_id, client_id } = body;

    const updatedTimer = await Timer.updateOne(
      {
        job_id: new ObjectId(job_id),
        freelancer_id: new ObjectId(userId),
        client_id: new ObjectId(client_id),
        'timer.end_time': null,
      },
      { $set: { 'timer.$[elem].end_time': Date.now() } },
      {
        arrayFilters: [{ 'elem.end_time': null }],
        multi: true,
        new: true,
        upsert: false,
      }
    );

    return null;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};

// ==== upload image  
const uploadScreenshot = async (
  payload: IUploadFile,
  freelancer_id: string
): Promise<ITimer | any> => {
  try {
    const image_url = payload.file;
    const jobId = payload.job_id;

    const existingTimer = await Timer.findOne({
      job_id: new ObjectId(jobId),
      freelancer_id: new ObjectId(freelancer_id),
    });

    if (!existingTimer) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Timer not found for the specified job and freelancer'
      );
    }

    const currentDate = new Date().setHours(0, 0, 0, 0);
    const timerStartDate = existingTimer.start_date?.setHours(0, 0, 0, 0);

    if (!timerStartDate) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Timer start date not found');
    }

    if (currentDate === timerStartDate) {
      existingTimer.screenshots.push({
        image_url: image_url,
      });
      const updatedTimer = await existingTimer.save();
      return updatedTimer;
    } else {
      return null;
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};

// ==== Get Daily Report 
const getDailyReport = async (
  freelancer_id: string,
  job_id: string
): Promise<ITimer | any> => {
  try {
    const existingTimer = await Timer.findOne({
      job_id: new ObjectId(job_id),
      freelancer_id: new ObjectId(freelancer_id),
    });

    if (!existingTimer) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Timer not found for the specified job and freelancer'
      );
    }

    const currentDate = new Date().setHours(0, 0, 0, 0);
    const timerStartDate = existingTimer.start_date?.setHours(0, 0, 0, 0);

    if (!timerStartDate) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Timer start date not found');
    }

    if (currentDate === timerStartDate) {
      const todayTotalTime = existingTimer.timer.reduce((total, timerEntry) => {
        const startTime = Number(timerEntry.start_time);
        const endTime = Number(timerEntry.end_time);
        const timeDifference = endTime - startTime;
        return total + timeDifference;
      }, 0);

      return {
        todayTotalTime,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};

// ==== Get The Weekly Report 




export const timerService = {
  startTimer,
  endTimer,
  uploadScreenshot,
  getDailyReport,
};

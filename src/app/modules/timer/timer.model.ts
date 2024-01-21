import { Schema, model } from 'mongoose';
import {
  IScreenShotFile,
  ITimer,
  ITimerFile,
  TimerModel,
} from './timer.interface';

const TimerFileSchema = new Schema<ITimerFile>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
    default: null,
  },
});

const screenShotFileSchema = new Schema<IScreenShotFile>({
  image_url: {
    type: String,
  },
});

const TimerSchema = new Schema<ITimer, TimerModel>(
  {
    job_id: {
      type: Schema.Types.ObjectId,
    },
    freelancer_id: {
      type: Schema.Types.ObjectId,
    },
    client_id: {
      type: Schema.Types.ObjectId,
    },
    timer: [TimerFileSchema],
    screenshots: [screenShotFileSchema],
    start_date: {
      type: Date,
    },
  },
  {
    timestamps: true, // This enables the automatic creation of createdAt and updatedAt fields
  }
);

export const Timer = model<ITimer, TimerModel>('Timer', TimerSchema);

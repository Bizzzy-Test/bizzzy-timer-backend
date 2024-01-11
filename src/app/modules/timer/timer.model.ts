import { Schema, model } from 'mongoose';
import { IScreenShotFile, ITimer, ITimerFile, TimerModel } from './timer.interface';

const TimerFileSchema = new Schema<ITimerFile>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    default: null
  },
});

const screenShotFileSchema = new Schema<IScreenShotFile>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  image_url: {
    type: String
  },
  created_at: Date
});

const TimerSchema = new Schema<ITimer, TimerModel>({
    job_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    freelancer_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    client_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    timer: [TimerFileSchema],
    screenshots: [screenShotFileSchema],
    start_date: {
        type: Date,
        required: true
    },  
},{
  timestamps: true  // This enables the automatic creation of createdAt and updatedAt fields
});


export const Timer = model<ITimer, TimerModel>('Timer', TimerSchema);
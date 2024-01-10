import { Schema, model } from 'mongoose';
import { ITimer, TimerModel, ITimerFile } from './timer.interface';
import { Types } from 'mongoose';

const TimerFileSchema = new Schema<ITimerFile>({
  _id: Schema.Types.ObjectId,
  image_url: {
    type: String
  },
  created_at: Number
})

const TimerSchema = new Schema<ITimer, TimerModel>({
  freelancerId: {
    type: Schema.Types.ObjectId,
    // required: true,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    // required: true,
  },
  startTime: [{
    type: Date,
    // required: true
  }],
  endTime: [{
    type: Date,
    // required: true
  }],
  limit: {
    type: Number,
  },
  start_date: {
    type: Date,
    // required: true
  },
  files: [TimerFileSchema],
  refarence: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});


export const Timer = model<ITimer, TimerModel>('Timer', TimerSchema);
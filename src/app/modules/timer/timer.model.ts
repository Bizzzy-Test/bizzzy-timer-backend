import { Schema, model } from 'mongoose';
import { ITimer, TimerModel } from './timer.interface';

const TimerSchema = new Schema<ITimer, TimerModel>({
  userId: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
  },
  startTime: [{
    type: Date,
  }],
  endTime: [{
    type: Date,
  }],
  duration: {
    type: String,
  },
  amount: {
    type: Number,
  },
  limite: {
    type: Number,
  },
  date: {
    type: Date,
  },
  file: [
    {
      type: String,
    }
  ],
  refarence: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

export const Timer = model<ITimer, TimerModel>('Timer', TimerSchema);


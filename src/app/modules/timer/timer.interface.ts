import { Model, Types } from 'mongoose';

export type ITimer = {
  save(): unknown;
  toObject(): ITimer;
  freelancerId: Types.ObjectId;
  jobId: Types.ObjectId;
  startTime: Number;
  time: [];
  endTime: Number;
  limit: number;
  start_date: Date;
  files: ITimerFile[];
  refarence: string;
  isActive: boolean;
};

export type ITimerFile = {
  _id: Types.ObjectId,
  image_url: string,
  created_at: Number
}

export type TimerModel = Model<ITimer, Record<string, unknown>>;

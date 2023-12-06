import { Model } from 'mongoose';

export type ITimer = {
  save(): unknown;
  toObject(): ITimer;
  userId: string;
  jobId: string;
  startTime: Date[];
  endTime: Date[];
  duration: string;
  amount: number;
  limite: number;
  date: Date;
  file: string;
  refarence: string;
  isActive: boolean;
};

export type TimerModel = Model<ITimer, Record<string, unknown>>;

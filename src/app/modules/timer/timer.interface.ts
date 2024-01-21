import { Model, Types } from 'mongoose';

export type ITimer = {
  save(): unknown;
  toObject(): ITimer;
  freelancer_id: Types.ObjectId;
  job_id: Types.ObjectId;
  client_id: Types.ObjectId;
  start_date: Date;
  timer: ITimerFile[];
  screenshots: IScreenShotFile[];
};

export type ITimerFile = {
  _id: Types.ObjectId,
  start_time: string,
  end_time: string
}

export type IScreenShotFile = {
  image_url: string,
}

export type IUploadFile={
  freelancer_id: Types.ObjectId,
  job_id: Types.ObjectId,
  file: string,
  upload_date: Date
}

export type TimerModel = Model<ITimer, Record<string, unknown>>;

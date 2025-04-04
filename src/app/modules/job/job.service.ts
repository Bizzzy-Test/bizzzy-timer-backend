/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'bson';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import OfferSchema from '../../models/offer.model';

const getJobs = async (userId: string, res: any): Promise<any> => {
  try {
    const query = [
        {
            $match: {
                freelancer_id: new ObjectId(userId),
                status: "accepted"
            }
        },
        {
            $lookup: {
                from: 'offers',
                localField: 'job_id',
                foreignField: 'job_id',
                as: 'job_details'
            }
        },
        {
            $unwind: "$job_details"
        },
        {
            $project: {
              	_id: 0,
                job_details: 1,
            }
        }
    ]
    
    let response = await OfferSchema.aggregate(query)
    
    return response;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error');
  }
};

export const jobService = {
    getJobs,
};


/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'bson';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import OfferSchema from '../../modles/offer.model';

const getJobs = async (userId: string, res: any): Promise<any> => {
  try {
    const query = [
        {
            $match: {
                freelencer_id: new ObjectId(userId),
                status: "accepted"
            }
        },
        {
            $lookup: {
                from: 'jobs',
                localField: 'job_id',
                foreignField: '_id',
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


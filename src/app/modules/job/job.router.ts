import express from 'express';
import { JobController } from './job.controller';
import { upload } from '../../middlewares/multer/multer';
import { validateToken } from '../../middlewares/json-web-token/jwt_token';
const router = express.Router();

router.get(
    '/getJobs',
    validateToken,
    JobController.getJobs
);

export const JobRoutes = router;
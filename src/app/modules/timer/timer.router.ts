import express from 'express';
import { validateToken } from '../../middlewares/json-web-token/jwt_token';
import { upload } from '../../middlewares/multer/multer';
import { TimerController } from './timer.controller';
const router = express.Router();

router.post('/start', validateToken, TimerController.StartTimer);

router.post('/end', validateToken, TimerController.EndTimer);

router.get('/:job_id/daily_report', validateToken, TimerController.getDailyReport)
router.get('/:job_id/weekly_report', validateToken, TimerController.getWeeklyReport)

router.post(
  '/uploadScreenshot',
  validateToken,
  upload.single('file'),
  TimerController.UploadScreenshot
);

export const TimerRoutes = router;

import express from 'express';
import { TimerController } from './timer.controller';
import { upload } from '../../middlewares/multer/multer';
const router = express.Router();

router.post(
    '/start',
    TimerController.StartTimer
);

router.post(
    '/stop',
    TimerController.StopTimer
);

router.get(
    '/todayTimerReport',
    TimerController.TodayTimerReport
);

router.post(
    '/uploadScreenshot',
    upload.single("file"),
    TimerController.UploadScreenshot
);


export const TimerRoutes = router;
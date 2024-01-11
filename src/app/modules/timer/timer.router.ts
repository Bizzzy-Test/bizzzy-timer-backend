import express from 'express';
import { TimerController } from './timer.controller';
import { upload } from '../../middlewares/multer/multer';
import { validateToken } from '../../middlewares/json-web-token/jwt_token';
const router = express.Router();

router.post(
    '/start',
    validateToken,
    TimerController.StartTimer
);

router.post(
    '/end',
    validateToken,
    TimerController.EndTimer
);

// router.post(
//     '/stop',
//     TimerController.StopTimer
// );

// router.get(
//     '/todayTimerReport',
//     TimerController.TodayTimerReport
// );

router.post(
    '/uploadScreenshot',
    upload.single("file"),
    TimerController.UploadScreenshot
);


export const TimerRoutes = router;
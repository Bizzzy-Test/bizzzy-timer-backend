import express from 'express';
import { TimerController } from './timer.controller';
// import validateRequest from '../../middlewares/validateRequest';
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


export const TimerRoutes = router;
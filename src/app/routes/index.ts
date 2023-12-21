import express from 'express';
import { TimerRoutes } from '../modules/timer/timer.router';
import { AuthRoutes } from '../modules/auth/auth.router';
import { JobRoutes } from '../modules/job/job.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/timer',
    route: TimerRoutes, 
  },
  {
    path: '/auth',
    route: AuthRoutes, 
  },
  {
    path: '/job',
    route: JobRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

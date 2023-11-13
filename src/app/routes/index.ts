import express from 'express';
import { TimerRoutes } from '../modules/timer/timer.router';
 
const router = express.Router();

const moduleRoutes = [
  {
    path: '/timer',
    route: TimerRoutes, 
  },
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

import express from 'express';
import { AuthController } from './auth.controller';
import { upload } from '../../middlewares/multer/multer';
const router = express.Router();

router.post(
    '/signIn',
    AuthController.signIn
);

export const AuthRoutes = router;
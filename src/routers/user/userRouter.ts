import userController from '~/controllers/userController';
import { Router } from 'express';
import { validate } from '~/middlewares/users/';

const userRouter = Router();

// [GET]
userRouter.get('/', userController.getall);

/**
 * [POST]
 * Path: /login
 * Body: {email: string, password: string }
 * Response: { accessToken: string, refetchToken: string, message: string }
 */
userRouter.post('/login', userController.login);

/**
 * [PORT]
 * Path: /register
 * Body: { name: string, email: string, password: string, confirm_password: string, date_birth: isISO8601 }
 */
userRouter.post('/register', validate.validateRegister, userController.register);

export default userRouter;

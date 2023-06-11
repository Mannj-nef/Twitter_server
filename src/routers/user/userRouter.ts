import userController from '~/controllers/userController';
import { Router } from 'express';
import { handleVerifyLogin } from '~/middlewares/verifyLogin';

const userRouter = Router();

// [GET]
userRouter.get('/', userController.getall);

// [POST]
userRouter.post('/login', handleVerifyLogin, userController.login);
userRouter.post('/register', userController.register);

export default userRouter;

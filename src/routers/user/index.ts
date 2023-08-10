import userController from '~/controllers/userController';
import { Router } from 'express';
import validate from '~/middlewares/users/';
import wrapRequestHandle from '~/utils/wrapRequest.util';
import middlewaresAuth from '~/middlewares/auth';
import filterRequestBody from '~/middlewares/common/filterRequestBody';
import {
  IChangePasswordRequestBody,
  IRegisterRequestBody,
  IUpdateMeRequestBody
} from '~/interfaces/requests';
import { changePassword, register, update } from '~/common/users/requestBody';

//  Path: /users
const userRouter = Router();

// [GET]-----------------------------------------

/**
 * [GET]
 * Path: /me
 * Header: {Authorization: 'Bearer <access_token>'}
 * Response: Omit<UserModel[], {
 *              password: string,
 *              forgot_password_token: JWT<forgot_password_token>,
 *              verify-email-token: JWT<email_verify_token>
 *           }>
 */

userRouter.get('/me', middlewaresAuth.authentication, wrapRequestHandle(userController.getMe));

/**
 * [GET]
 * Path: /:username
 * Param: {username: string}
 * Response: {message: string, user: UserModel}
 */
userRouter.get('/:username', wrapRequestHandle(userController.getProfile));

/**
 * [GET]
 * Path: /oauth/google
 * Querry: {code: string}
 * Redirect: /?accesstoken=JWT<access_token>&refreshToken=JWT<refresh_token>
 */
userRouter.get('/oauth/google', wrapRequestHandle(userController.oauth));

// [POST]-----------------------------------------

/**
 * [POST]
 * Path: /login
 * Body: {email: string, password: string }
 * Response: { accessToken: JWT<access_token>, refetchToken: JWT<refresh_token>, message: string }
 */
userRouter.post('/login', validate.login, wrapRequestHandle(userController.login));

/**
 * [PORT]
 * Path: /register
 * Body: { name: string, email: string, password: string, confirm_password: string, date_birth: isISO8601 }
 * Response: { accessToken: JWT<access_token>, refetchToken: JWT<refresh_token>, message: string }
 */
userRouter.post(
  '/register',
  filterRequestBody<IRegisterRequestBody>(register),
  validate.register,
  wrapRequestHandle(userController.register)
);

/**
 * [PORT]
 * Path: /refresh-token
 * Body: { refreshToken: JWT<refersh_token> }
 * Response: { accessToken: JWT<access_token>, refetchToken: JWT<refresh_token>, message: string }
 */
userRouter.post(
  '/refresh-token',
  middlewaresAuth.verifyRefreshToken,
  wrapRequestHandle(userController.refreshToken)
);

/**
 * [PORT]
 * Path: /logout
 * Header: {Authorization: 'Bearer <access_token>'}
 * Body: { refetchToken: JWT<refersh_token> }
 * Response: { message: string }
 */
userRouter.post(
  '/logout',
  middlewaresAuth.authentication,
  validate.logout,
  middlewaresAuth.verifyRefreshToken,
  wrapRequestHandle(userController.logout)
);

/**
 * [PORT]
 * Path: /verify-email
 * Body: { verify-email-token: JWT<email_verify_token> }
 * Response: { accessToken: JWT<access_token>, refreshToken: JWT<access_token> }
 */
userRouter.post(
  '/veriry-email',
  validate.emailToken,
  middlewaresAuth.verifyEmailToken,
  wrapRequestHandle(userController.verifyEmail)
);

/**
 * [PORT]
 * Path: /send-email
 * Header: {Authorization: 'Bearer <access_token>'}
 * Response: { message: string }
 */
userRouter.post(
  '/send-email',
  middlewaresAuth.authentication,
  wrapRequestHandle(userController.sendEmail)
);

/**
 * [PORT]
 * Path: /forgot-password
 * Body: { email: string }
 * Response: { message: string }
 */
userRouter.post(
  '/forgot-password',
  validate.forgotPassword,
  wrapRequestHandle(userController.forgotPassword)
);

/**
 * [PORT]
 * Path: /verify-forgot-password
 * Body: { forgot_password_token: JWT<forgot_password_token> }
 * Response: { message: string }
 */
userRouter.post(
  '/verify-forgot-password',
  validate.forgotPasswordToken,
  middlewaresAuth.verifyForgotPassWordToken,
  wrapRequestHandle(userController.verifyForgotPassWord)
);

/**
 * [PORT]
 * Path: /reset-password
 * Body: { password: string, confirm_password: string, forgot_password_token: JWT<forgot_password_token> }
 * Response: { message: string }
 */
userRouter.post(
  '/reset-password',
  validate.resetPassword,
  middlewaresAuth.verifyForgotPassWordToken,
  wrapRequestHandle(userController.resetPassword)
);

// [PATCH]------------------------------------------------

/**
 * [PATCH]
 * Path: /me
 * Header: {Authorization: 'Bearer <access_token>'}
 * Body: UserModel
 * Response: { message: string }
 */
userRouter.patch(
  '/me',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  filterRequestBody<IUpdateMeRequestBody>(update),
  validate.updateMe,
  wrapRequestHandle(userController.updateMe)
);

/**
 * [PUT]
 * Path: /change-password
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { current_password: string, password: string, password_confirmation: string }
 * Response: { message: string }
 */
userRouter.put(
  '/change-password',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  filterRequestBody<IChangePasswordRequestBody>(changePassword),
  validate.changePassword,
  wrapRequestHandle(userController.changePassword)
);

// [DELETE]------------------------------------------------

// middlewaresAuth.authentication,
// middlewaresAuth.verifyStatusUser,

export default userRouter;

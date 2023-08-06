import changePassword from './changePassword';
import forgotPassword from './forgotPassWord';
import getMe from './getMe';
import getProfile from './getProfile';
import login from './login';
import logout from './logout';
import register from './register';
import resendVerifyEmail from './resendVerifyEmail';
import resetPassword from './resetPassword';
import updateMe from './updateMe';
import verifyEmailToken from './verifyEmailToken';
import oauth from './oauth';
import refrestToken from './refreshToken';

const user = {
  login,
  logout,
  register,
  verifyEmailToken,
  resendVerifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
  updateMe,
  getProfile,
  changePassword,
  oauth,
  refrestToken
};

export default user;

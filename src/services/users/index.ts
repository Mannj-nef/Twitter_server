import forgotPassword from './forgotPassWord';
import getMe from './getMe';
import login from './login';
import logout from './logout';
import register from './register';
import resendVerifyEmail from './resendVerifyEmail';
import resetPassword from './resetPassword';
import verifyEmailToken from './verifyEmailToken';

const user = {
  login,
  logout,
  register,
  verifyEmailToken,
  resendVerifyEmail,
  forgotPassword,
  resetPassword,
  getMe
};

export default user;

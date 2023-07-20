import changePassword from './changePassword';
import follow from './follow';
import forgotPassword from './forgotPassWord';
import getMe from './getMe';
import getProfile from './getProfile';
import login from './login';
import logout from './logout';
import register from './register';
import resendVerifyEmail from './resendVerifyEmail';
import resetPassword from './resetPassword';
import unFollow from './unfollow';
import updateMe from './updateMe';
import verifyEmailToken from './verifyEmailToken';
import oauth from './oauth';

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
  follow,
  unFollow,
  changePassword,
  oauth
};

export default user;

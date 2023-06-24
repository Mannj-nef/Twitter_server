import user from './users';

class UserServices {
  register = user.register;
  login = user.login;
  logout = user.logout;

  // email
  verifyEmail = user.verifyEmailToken;
  resendVerifyEmail = user.resendVerifyEmail;

  // password
  forgotPassword = user.forgotPassword;
  resetPassword = user.resetPassword;

  // user
  getMe = user.getMe;
  updateMe = user.updateMe;
  getProfile = () => [];
  follow = () => [];
  unfollow = () => [];
}

const userServices = new UserServices();
export default userServices;

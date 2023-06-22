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
  resetPassword = () => [];

  // user
  getMe = () => [];
  updateMe = () => [];
  getProfile = () => [];
  follow = () => [];
  unfollow = () => [];
}

const userServices = new UserServices();
export default userServices;

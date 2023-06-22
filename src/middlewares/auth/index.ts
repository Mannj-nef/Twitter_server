import authentication from './authentication';
import emailVerifyToken from './emailToken';
import verifyRefreshToken from './refreshToken';
import checkVerifyUser from './checkVerifyUser';
import verifyForgotPassWordToken from './verifyForgotPasswordToken';

const middlewaresAuth = {
  authentication,
  emailVerifyToken,
  verifyRefreshToken,
  checkVerifyUser,
  verifyForgotPassWordToken
};

export default middlewaresAuth;

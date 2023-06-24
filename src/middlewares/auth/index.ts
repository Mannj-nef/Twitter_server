import authentication from './authentication';
import verifyEmailToken from './verifyEmailToken';
import verifyRefreshToken from './refreshToken';
import verifyStatusUser from './verifyStatusUser';
import verifyForgotPassWordToken from './verifyForgotPasswordToken';

const middlewaresAuth = {
  authentication,
  verifyEmailToken,
  verifyRefreshToken,
  verifyStatusUser,
  verifyForgotPassWordToken
};

export default middlewaresAuth;

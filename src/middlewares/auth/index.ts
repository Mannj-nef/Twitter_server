import authentication from './authentication';
import emailVerifyToken from './emailToken';
import verifyRefreshToken from './refreshToken';
import checkVerifyUser from './checkVerifyUser';

const middlewaresAuth = {
  authentication,
  emailVerifyToken,
  verifyRefreshToken,
  checkVerifyUser
};

export default middlewaresAuth;

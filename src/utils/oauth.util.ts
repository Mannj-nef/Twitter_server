import axios from 'axios';
import dotenv from 'dotenv';
import { IGetTokenOauthRequest } from '~/interfaces/requests/oauth.requests';

import jwt from 'jsonwebtoken';
import { IResponseGoogleUserInfo } from '~/interfaces/response';

dotenv.config();

export const getUserGoogeInfor = async (code: string) => {
  // Request Body to google oauth  token
  const requestBody: IGetTokenOauthRequest = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_SERVER as string,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    grant_type: 'authorization_code'
  };

  /**
   * @url Google oauth token
   * @body RequestBody
   * @headers 'Content-Type': 'application/x-www-form-urlencoded'
   */
  const {
    data: { id_token }
  } = await axios.post(process.env.GOOGLE_OAUTH_TOKEN_URI as string, requestBody, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const userDecode = jwt.decode(id_token);

  return userDecode as IResponseGoogleUserInfo;
};

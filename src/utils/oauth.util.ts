import axios from 'axios';
import dotenv from 'dotenv';
import { IGetTokenOauthRequest } from '~/interfaces/requests/oauth.requests';

import jwt from 'jsonwebtoken';

dotenv.config();

export const getTokenOauth = async (code: string) => {
  const requestBody: IGetTokenOauthRequest = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_SERVER as string,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    grant_type: 'authorization_code'
  };

  const { data } = await axios.post(process.env.GOOGLE_OAUTH_TOKEN_URI as string, requestBody, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  console.log(data);

  console.log(jwt.decode(data.id_token));

  return data as {
    access_token: string;
    refresh_token: string;
    id_token: string;
  };
};

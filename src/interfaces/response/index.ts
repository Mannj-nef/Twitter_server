export interface IResponse {
  message: string;
}

export interface IResponseResult<T> extends IResponse {
  result: T;
}

export interface IResponseToken extends IResponse {
  access_token: string;
  refresh_token: string;
}

export interface IResponseGoogleUserInfo {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
}

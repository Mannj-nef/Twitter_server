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

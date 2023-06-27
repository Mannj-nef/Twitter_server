import {
  IChangePasswordRequestBody,
  IRegisterRequestBody,
  IUpdateMeRequestBody
} from '~/interfaces/requests';

export const update: Array<keyof IUpdateMeRequestBody> = [
  'avatar',
  'bio',
  'cover_photo',
  'date_of_birth',
  'location',
  'name',
  'username',
  'website'
];

export const register: Array<keyof IRegisterRequestBody> = [
  'confirm_password',
  'date_of_birth',
  'email',
  'name',
  'password'
];

export const changePassword: Array<keyof IChangePasswordRequestBody> = [
  'confirm_password',
  'current_password',
  'password'
];

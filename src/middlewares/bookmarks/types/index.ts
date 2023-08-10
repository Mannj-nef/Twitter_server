import { ParamSchema } from 'express-validator';
import { IBookmarkRequestBody } from '~/interfaces/requests';
import { IBookmark } from '~/models/schemas/BookMark';

export type typebookmarkSchema = {
  [k in keyof Required<IBookmark>]: ParamSchema;
};

export type typeBookmarkRequest = {
  [k in keyof IBookmarkRequestBody]: ParamSchema;
};

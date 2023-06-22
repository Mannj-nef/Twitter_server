import { UserModel } from '~/models/schemas';

export type UserUnion = Exclude<Partial<UserModel>, undefined>;

import { FollowerModel } from '~/models/schemas';

export type FollowerUnion = Exclude<Partial<FollowerModel>, undefined>;

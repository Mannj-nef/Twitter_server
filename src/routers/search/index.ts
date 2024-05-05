import { Router } from 'express';
import searchController from '~/controllers/searchController';
import middlewaresAuth from '~/middlewares/auth';

//  Path :/search
const useRouter = Router();

/**
 * [GET]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string, result: TweetModel[] | UserModel[] } }
 * Query: { content: string, page: number, limit: number, media_type: MediaType, user_follow: 0 | 1 }
 */
useRouter.get(
  '/',
  middlewaresAuth.authentication,
  middlewaresAuth.verifyStatusUser,
  searchController.search
);

export default useRouter;

import { Router } from 'express';
import searchController from '~/controllers/searchController';

//  Path :/search
const useRouter = Router();

/**
 * [GET]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: { message: string, result: TweetModel[] | UserModel[] } }
 * Query: { content: string, page: number, limit: number, media_type: MediaType }
 */
useRouter.get('/', searchController.search);

export default useRouter;

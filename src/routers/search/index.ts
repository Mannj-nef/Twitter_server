import { Router } from 'express';
import searchController from '~/controllers/searchController';

//  Path :/search
const useRouter = Router();

/**
 *
 */
useRouter.get('/', searchController.search);

export default useRouter;

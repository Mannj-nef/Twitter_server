import router from 'express';
import mediaControler from '~/controllers/mediaController';

const staticRouter = router();

staticRouter.get('/images/:name', mediaControler.serveImage);

export default staticRouter;

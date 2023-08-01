import router from 'express';
import mediaControler from '~/controllers/mediaController';

const staticRouter = router();

staticRouter.get('/images/:name', mediaControler.serveImage);
staticRouter.get('/videos/:name', mediaControler.serveVideo);

export default staticRouter;

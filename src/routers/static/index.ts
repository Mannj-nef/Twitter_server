import router from 'express';
import mediaControler from '~/controllers/mediaController';

const staticRouter = router();

staticRouter.get('/images/:name', mediaControler.serveImage);
staticRouter.get('/videos/:name', mediaControler.serveVideo);
staticRouter.get('/videos-stream/:name', mediaControler.serveStreamVideo);

export default staticRouter;

import express from 'express';
import router from './routers';
import dotenv from 'dotenv';
import database from './databases';
import cors from 'cors';
import errorHandler from './middlewares/errors';
import corsConfig from './configs/cors';
import { handleCreateFolder } from './utils/file.util';
import { UPLOAD_IMAGE_TEMP_DIR } from './constants/dirs';

// .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3838;

//  init foulder uploads
handleCreateFolder(UPLOAD_IMAGE_TEMP_DIR);

// config cors
app.use(cors(corsConfig));

// connect db
database.connect();

// body parser
app.use(express.json());

// router
app.use(router);

// handle error
app.use(errorHandler);

// lisster port
app.listen(port, () => {
  console.log(`server listien on port ${port}`);
});

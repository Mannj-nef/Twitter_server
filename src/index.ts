import express from 'express';
import router from './routers';
import dotenv from 'dotenv';
import database from './databases';
import cors from 'cors';
import errorHandler from './middlewares/errors';
import corsConfig from './configs/cors';
import initFolder from './utils/initFolder';

const START_SERVER = async () => {
  try {
    // connect db
    // database.connect();
    await database.connect().then(() => {
      database.createIndexCollection();
    });

    // .env
    dotenv.config();

    const app = express();
    const port = process.env.PORT || 3838;

    //  init foulder uploads
    initFolder();

    // config cors
    app.use(cors(corsConfig));

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
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

START_SERVER();

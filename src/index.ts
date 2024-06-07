import express from 'express';
import router from './routers';
import dotenv from 'dotenv';
import database from './databases';
import cors from 'cors';
import errorHandler from './middlewares/errors';
import corsConfig from './configs/cors';
import initFolder from './utils/initFolder';
import { Server } from 'socket.io';
import { createServer } from 'http';

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
    const server = createServer(app);
    const io = new Server(server);
    const port = process.env.PORT || 3838;

    //  init folder uploads
    initFolder();

    // config cors
    app.use(cors(corsConfig));

    // body parser
    app.use(express.json());

    // router
    app.use(router);

    // handle error
    app.use(errorHandler);

    // listen  port
    server.listen(port, () => {
      console.log(`server listen on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

START_SERVER();

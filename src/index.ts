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
    await database.connect().then(() => {
      database.createIndexCollection();
    });

    // .env
    dotenv.config();

    const app = express();
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL
      }
    });
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

    // socket io
    // io.on('connection', (socket) => {
    //   console.log('---------------------------------------------------------------------------');

    //   console.log('a user connected: ', socket.id);

    //   socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //   });

    //   socket.on('message', (data) => {
    //     console.log('message: ', data);
    //   });
    // });

    // listen  port
    app.listen(port, () => {
      console.log(`server listen on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

START_SERVER();

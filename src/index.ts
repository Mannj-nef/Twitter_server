import express from 'express';
import router from './routers';
import database from './databases';

const app = express();
const port = process.env.PORT || 3838;

// connect db
database.connect();

// body parser
app.use(express.json());

// router
app.use(router);

// lisster port
app.listen(port, () => {
  console.log(`server listien on port ${port}`);
});

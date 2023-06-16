import { config } from 'dotenv';
config();

const corsConfig = {
  origin: [process.env.PORT as string],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};

export default corsConfig;

import dotenv from 'dotenv';
dotenv.config();

const corsConfig = {
  origin: [process.env.PORT as string, process.env.CLIENT_URL as string],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};

export default corsConfig;

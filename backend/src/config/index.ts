import dotenv from "dotenv";

dotenv.config();

const MONGO_URI: string = `${process.env.MONGO_URI}`;

const PORT: number = parseInt(`${process.env.PORT}`) || 8000;

const ROUNDS: number = parseInt(`${process.env.ROUNDS}`) || 10;

const JWT_SECRET: string = `${process.env.JWT_SECRET}`;

const ENV = `${process.env.ENV}`;

export const config = {
  mongodb: {
    url: MONGO_URI,
  },
  server: {
    port: PORT,
    rounds: ROUNDS,
  },
  jwt: {
    secret: JWT_SECRET,
  },
  env: ENV,
  api: {},
};

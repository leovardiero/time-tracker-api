import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import cors from 'cors';
import helmet from 'helmet';

import express from 'express';
import homeRoutes from './routes/HomeRoutes';
import userRoute from './routes/UserRoutes';
import projectRoute from './routes/ProjectRoutes';
import clientRoute from './routes/ClientRoutes';
import tokenRoute from './routes/TokenRoutes';

const whiteList = [
  'http://localhost:3001',
];

const corsOpetion = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOpetion));
    this.app.use(helmet());
    this.app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user', userRoute);
    this.app.use('/login', tokenRoute);
    this.app.use('/project', projectRoute);
    this.app.use('/client', clientRoute);
  }
}

export default new App().app;

import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { Response, RESPONSE_STATUS, RESPONSE_MESSAGE } from './appConstant.js';
dotenv.config({ path: '.env' });
import { initDb } from './config/database.js';
import { swagerOption } from './config/swagger.js';

const app = new express();

import { gameRouter } from './routes/game/index.js';

app.use(express.json({limit: '10kb'})); //uploading data should be less than or equal to 10kb
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb'}));
app.use(cors({
  origin: ['https://game-apis-1.onrender.com/']
}));

// middleware
const promisify = (req, res, next) => {
  res.sendPromise = (promise) => {
    promise
      .then((result) => {
        res.send(new Response(RESPONSE_STATUS.OK, RESPONSE_MESSAGE.OK, result));
      })
      .catch((err) => {
        console.log(err);
        res.status(RESPONSE_STATUS.ERROR);
        res.send(new Response(RESPONSE_STATUS.ERROR, err.message, err));
      });
  };
  next();
};
app.use(promisify);

initDb()
  .then(() => {
    console.log('DB connected..');
  })
  .catch((err) => {
    console.log('Error while connecting to DB.', err);
  });

app.use(helmet());

// Swagger documentation
const specs = swaggerJSDoc(swagerOption);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(gameRouter);

app.use('*', async (req, res) => {
  console.log(req.body);
  res.status(404).send('Not Found');
});

export { app };
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

const app = new express();

import { gameRouter } from './routes/game/index.js';

app.use(express.json({limit: '10kb'})); //uploading data should be less than or equal to 10kb
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb'}));
app.use(cors());

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
  .catch(() => {});

app.use(helmet());

// Swagger documentation for APIs
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Game CRUD App",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Minnat Ali",
        email: "minnatali65@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/game/*.js"],
};
const specs = swaggerJSDoc(options);
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
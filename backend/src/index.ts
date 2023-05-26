import http from "http";
import express, { Application, Request, Response } from 'express';
import { createHttpTerminator } from 'http-terminator';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import "./process";
import { env } from "./config";
import routes from "./routes";

dotenv.config();

export const app: Application = express();

export const server = http.createServer(app);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send(
    `${env.environment === 'production'
      ? 'Welcome to xportt production environment'
      : 'Welcome to xportt development environment'
    }`
  );
});

app.use('/exportt/api/v1', routes);

app.all('/*', (req: Request, res: Response, next) => {
  next(new Error('Resource unavailable'));
});

app.use((err: any, req: Request, res: Response) => {
  res.status(400).send({
    success: false,
    message: err.message.toLowerCase().includes('duplicate key')
      ? 'Account already exists'
      : err.message,
  });
});

export const httpTerminator = createHttpTerminator({
  server,
});


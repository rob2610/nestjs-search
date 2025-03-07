import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as functions from 'firebase-functions';

const expressServer = express();
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: true }));
const createFunction = async (expressInstance): Promise<void> => {
  console.log('Initializing NestJS');
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({});
  await app.init();
  console.log('NestJS Initialized and Routes Loaded.');
};

export const api = functions.https.onRequest(async (request, response) => {
  console.log('Received request:', request.method, request.url);
  await createFunction(expressServer);
  expressServer(request, response);
});

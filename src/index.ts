import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';
import * as express from 'express';

const expressServer = express();
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: true }));
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
   app.enableCors();
  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  console.log('Received request:', request.method, request.url);
  if (!expressServer._router.stack.length) {
    await createFunction(expressServer);
  }
  expressServer(request, response);
});

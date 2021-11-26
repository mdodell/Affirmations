/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.use(
    session({
      secret: 'sessionsecret',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(csurf({ cookie: true }));

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import fastifyCookie from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@/modules/app.module';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCookie);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: process.env.ORIGIN,
    methods,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 9000, '0.0.0.0');
}

void bootstrap();

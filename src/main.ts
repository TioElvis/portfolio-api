import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import fastifyCookie from '@fastify/cookie';

import { AppModule } from '@/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCookie, { secret: '' });

  await app.listen(process.env.PORT ?? 9000, '0.0.0.0');
}

void bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  app.enableCors({
    origin: [/^http:\/\/localhost:\d+$/],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

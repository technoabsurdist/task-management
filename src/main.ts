import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()) // always use this pipe for all endpoints
  app.useGlobalInterceptors(new TransformInterceptor()) // interceptor to serialize
  await app.listen(3000);
}
bootstrap();

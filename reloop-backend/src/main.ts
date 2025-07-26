import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix (optional): /api
  app.setGlobalPrefix('api');

  // Global Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Global Interceptor for consistent response format
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
  console.log(`🚀 Application is running on: http://localhost:3000/api`);
}
bootstrap();

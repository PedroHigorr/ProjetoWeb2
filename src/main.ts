import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      whitelist: true, 
      forbidNonWhitelisted: false,
    }),
  )
    // Habilitar CORS
    app.enableCors({
      origin: 'http://localhost:3000', // Permita apenas seu front-end
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
      credentials: true, // Habilitar cookies/sessões, se necessário
    });
  await app.listen(4000);
}
bootstrap();

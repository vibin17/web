import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.SHOP_PORT
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`Server created on port ${PORT}`));
}
bootstrap();

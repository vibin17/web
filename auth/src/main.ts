import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose  from 'mongoose'
import * as dotenv from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT
  await app.listen(PORT, () => console.log(`Server created on port ${PORT}`));
}
bootstrap();

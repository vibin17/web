import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose  from 'mongoose'
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let a = await mongoose.connect('mongodb://mongo:27017')
  await app.listen(5000);
}
bootstrap();

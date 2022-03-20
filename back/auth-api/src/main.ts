import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { cors: { origin: 'http://localhost:3000', credentials: true }});
  const PORT = process.env.PORT
  const MICROSERVICE_PORT = process.env.MICROSERVICE_PORT
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: MICROSERVICE_PORT
    }
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.startAllMicroservices()
  await app.listen(PORT, () => {
    console.log(`Server created on port ${PORT}`)
    console.log(`Auth microservice available on port ${MICROSERVICE_PORT}`)
  });
}
bootstrap();

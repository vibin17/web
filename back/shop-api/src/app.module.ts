import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './consts';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ENV_PATH, isGlobal: true}),
    MongooseModule.forRoot(process.env.DB_URL),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: parseInt(process.env.MICROSERVICE_PORT)
      }
    }]),
    ProductsModule,
    OrdersModule
  ]
})
export class AppModule {}

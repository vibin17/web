import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './consts';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: ENV_PATH, isGlobal: true}),
    MongooseModule.forRoot(process.env.DB_URL),
    ProductsModule],
})
export class AppModule {}

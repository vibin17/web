import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from 'src/consts';
import { FilesModule } from 'src/files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ENV_PATH }),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: parseInt(process.env.MICROSERVICE_PORT)
      }
    }]),
    FilesModule, 
    MongooseModule.forFeature([{
      name: Product.name, 
      schema: ProductSchema
    }]),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../..', 'product-images'),
      serveRoot: '/products/images'
    })
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}

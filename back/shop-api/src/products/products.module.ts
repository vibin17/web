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

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ENV_PATH }), 
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
})
export class ProductsModule {}

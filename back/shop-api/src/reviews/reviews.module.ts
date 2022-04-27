import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from 'src/consts';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ProductsModule } from 'src/products/products.module';

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
    MongooseModule.forFeature([{
      name: Review.name, 
      schema: ReviewSchema
    }]),
    forwardRef(() => ProductsModule)
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}

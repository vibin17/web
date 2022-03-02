import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema} from './users/schemas/user.schema';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: './.env', isGlobal: true}),
            MongooseModule.forRoot(process.env.DB_URL),
            UsersModule,
            AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

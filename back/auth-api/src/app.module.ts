import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ENV_PATH } from './consts';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: ENV_PATH, isGlobal: true}),
            MongooseModule.forRoot(process.env.DB_URL),
            UsersModule,
            AuthModule]
})
export class AppModule {}

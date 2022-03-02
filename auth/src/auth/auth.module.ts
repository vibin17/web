import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UsersModule), ConfigModule.forRoot({envFilePath: './.env'}), JwtModule.register( {
    secret: process.env.PRIVATE_KEY,
    signOptions: {
      expiresIn: '24h'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}

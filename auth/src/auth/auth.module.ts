import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [forwardRef(() => UsersModule), ConfigModule.forRoot({envFilePath: './.env'}), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [
    AuthService,
    TokenService
  ]
})
export class AuthModule {}

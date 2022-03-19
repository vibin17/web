import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SignInUserDto } from 'src/users/dto/signin-user.dto';
import { SignUpUserDto } from 'src/users/dto/signup-user.dto';
import { ValidationPipe } from 'src/validation/validation';
import { AuthService } from './auth.service';
import { TokensDto } from './dto/tokens.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signin')
    async signIn(@Body() userDto: SignInUserDto) {
        const response = await this.authService.signIn(userDto)
        return response
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() userDto: SignUpUserDto) {
        const response = await this.authService.signUp(userDto)
        return response
    }

    @MessagePattern({ role: 'auth', cmd: 'refresh'})
    @Post('/refresh')
    async refresh(@Body() tokensDto: TokensDto) {
        const response = this.authService.refresh(tokensDto.refresh)
        return response
    }
}

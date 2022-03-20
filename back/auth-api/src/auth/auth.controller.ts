import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SignInUserDto } from 'src/users/dto/signin-user.dto';
import { SignUpUserDto } from 'src/users/dto/signup-user.dto';
import { ValidationPipe } from 'src/validation/validation';
import { AuthService } from './auth.service';
import { AccessDto, RefreshDto } from './dto/tokens.dto';

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

    @Post('/refresh')
    async refresh(@Body() tokensDto: RefreshDto) {
        const response = this.authService.refresh(tokensDto.refresh)
        return response
    }

    @MessagePattern({ role: 'auth', cmd: 'check'})
    async checkIsSignedIn(tokensDto: AccessDto) {
        const response = this.authService.checkIsSignedIn(tokensDto.access)
        return response
    }
}

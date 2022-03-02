import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ValidationPipe } from 'src/validation/validation';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: AuthUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}

import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/schemas/user.schema';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, 
                private jwtService: JwtService) {}

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getByPhoneNumber(userDto.phoneNumber) 
                || await this.userService.getByName(userDto.name)
        if (candidate) {
            throw new HttpException('Пользователь с таким логином или номером телефона уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, parseInt(process.env.SALT))
        const user = await this.userService.create({...userDto, password: hashPassword})
        return this.generateToken(user)
    }
    
    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    private async validateUser(userDto: AuthUserDto) {
        const user = await this.userService.getByName(userDto.name)
        const passwordsEqual = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordsEqual) {
            return user
        }
        throw new UnauthorizedException({message: "Неверный логин или пароль"})
    }

    private async generateToken(user: User) {
        const payload = {name: user.name, phoneNumber: user.phoneNumber, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }
}

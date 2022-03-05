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
        return { ...await this.generateAccessToken(user), ...await this.generateRefreshToken(user)}
    }
    
    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto)
        return { ...await this.generateAccessToken(user), ...await this.generateRefreshToken(user)}
    }
    
    async refresh(refresh: string) {
        const userData = await this.validateRefreshToken(refresh)
        try {
            const user = await this.userService.getByName(userData.name)
            return { ...await this.generateAccessToken(user), ...await this.generateRefreshToken(user)}
        }
        catch {
            throw new HttpException('Токен неактуален', HttpStatus.BAD_REQUEST)
        }
    }

    private async validateUser(userDto: AuthUserDto) {
        const user = await this.userService.getByName(userDto.name)
        const passwordsEqual = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordsEqual) {
            return user
        }
        throw new UnauthorizedException({message: "Неверный логин или пароль"})
    }

    private async generateAccessToken(user: User) {
        const payload = {name: user.name, phoneNumber: user.phoneNumber, roles: user.roles}
        return {
            access: this.jwtService.sign(payload, {
                secret: process.env.ACCESS_KEY,
                expiresIn: '20m'
            })
        }
    }

    private async generateRefreshToken(user: User) {
        const payload = {name: user.name, phoneNumber: user.phoneNumber, roles: user.roles}
        return {
            refresh: this.jwtService.sign(payload, {
                secret: process.env.REFRESH_KEY,
                expiresIn: '30d'
              })
        }
    }

    async validateAccessToken(access: string) {
        try {
            return this.jwtService.verify(access, {secret: process.env.ACCESS_KEY })
        }
        catch {
            throw new UnauthorizedException({message: "Токен недействителен"})
        }
    }

    async validateRefreshToken(refresh: string) {
        try {
            return this.jwtService.verify(refresh, {secret: process.env.REFRESH_KEY })
        }
        catch {
            throw new UnauthorizedException({message: "Токен недействителен"})
        }
    }
}

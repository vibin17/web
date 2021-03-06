import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/schemas/user.schema';
import { SignInUserDto, SignUpUserDto } from 'src/users/dto/request.dto';
import { AuthCheckDto, AuthResponseDto, UserTokenData} from 'src/auth/dto/auth-response.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, 
                private tokenService: TokenService) {}

    async signIn(userDto: SignInUserDto): Promise<AuthResponseDto> {
        const { userName, phoneNumber, roles } = await this.validateUser(userDto)
        const user: UserTokenData = { userName, phoneNumber, roles }
        return { 
            userData: user, 
            access: await this.tokenService.generateAccessToken(user), 
            refresh: await this.tokenService.generateRefreshToken(user)
        }
    }

    async signUp(userDto: SignUpUserDto): Promise<AuthResponseDto> {
        const candidate = await this.userService.getByPhoneNumber(userDto.phoneNumber) 
                || await this.userService.getByName(userDto.userName)
        if (candidate) {
            throw new HttpException('Пользователь с таким логином или номером телефона уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, parseInt(process.env.SALT))
        const { userName, phoneNumber, roles } = await this.userService.create({ ...userDto, password: hashPassword })
        const user: UserTokenData = { userName, phoneNumber, roles }
        return { 
            userData: user, 
            access: await this.tokenService.generateAccessToken(user), 
            refresh: await this.tokenService.generateRefreshToken(user)
        }
    }
    
    async refresh(refresh: string): Promise<AuthResponseDto> {
        const userData: UserTokenData  = await this.tokenService.validateRefreshToken(refresh)
        const { userName, phoneNumber, roles } = await this.userService.getByName(userData.userName)
        if (!userName) {
            throw new HttpException('Пользователь из токена не найден', HttpStatus.UNAUTHORIZED)
        }
        const user: UserTokenData = { userName, phoneNumber, roles }
        return { 
            userData: user, 
            access: await this.tokenService.generateAccessToken(user), 
            refresh: await this.tokenService.generateRefreshToken(user)
        }
    }

    async checkIsSignedIn(access: string): Promise<AuthCheckDto> {
        const userData: UserTokenData  = await this.tokenService.validateAccessToken(access)
        const { userName, phoneNumber, roles } = await this.userService.getByName(userData.userName)
        if (!userName) {
            throw new HttpException('Пользователь из токена не найден', HttpStatus.UNAUTHORIZED)
        }
        const user: UserTokenData = { userName, phoneNumber, roles }
        return { 
            userData: user
        }
    }

    private async validateUser(userDto: SignInUserDto): Promise<User> {
        const user: User  = await this.userService.getByName(userDto.userName)
        const passwordsEqual = await bcrypt.compare(userDto.password, user.password)
        if (!user) {
            throw new BadRequestException({ message: 'Не найден пользователь с таким именем' })
        }
        if (!passwordsEqual) {
            throw new BadRequestException({ message: 'Неверный пароль' })
        }
        return user
    }
}

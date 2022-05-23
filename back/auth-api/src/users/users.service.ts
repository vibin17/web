import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInUserDto, SignUpUserDto } from './dto/request.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { RolesEnum } from './schemas/roles.enum';
import { TokenService } from 'src/auth/token.service';
import { UserTokenData } from 'src/auth/dto/auth-response.dto';
import { UserInfoDto } from './dto/response.dto';

@Injectable()
export class UsersService {
  
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, 
              private tokenService: TokenService) {}
  
    async create(createUserDto: SignUpUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save()
    }

    async getAll() {
        const allUsers = await this.userModel.find()
        return allUsers
    }

    async getByName(userName: string) {
        const user = await this.userModel.findOne({ userName })
        return user
    }

    async getByPhoneNumber(phoneNumber: string) {
        const user = await this.userModel.findOne({ phoneNumber })
        return user
    }

    async updateByName(userName: string, updateUserDto: SignInUserDto) {
        const updatedUser = this.userModel.findOneAndUpdate({ userName }, updateUserDto, { new: true });
        return updatedUser
    }

    async setAdmin(userName: string) {
        const user = this.userModel.findOneAndUpdate({ userName }, { roles: [RolesEnum.Admin, RolesEnum.User] }, { new: true })
        if (!user) {
        throw new BadRequestException('Пользователь не найден')
        }
        return user
    }

    async deleteByName(userName: string) {
        const deletedUser = await this.userModel.deleteOne({ userName })
        return deletedUser
    }

    async getUserInfoByToken(access: string): Promise<UserInfoDto> {
        const userData: UserTokenData  = await this.tokenService.validateAccessToken(access)
        const { _id: userId, userName } = await this.getByName(userData.userName)
        if (!userId) {
            throw new HttpException('Пользователь из токена не найден', HttpStatus.UNAUTHORIZED)
        }
        return { userId, userName }
    }
}

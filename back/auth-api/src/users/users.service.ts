import { BadRequestException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { RolesEnum } from './schemas/roles.enum';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
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
    return updateUserDto
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
}

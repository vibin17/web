import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { RolesEnum } from './schemas/roles.enum';

@Injectable()
export class UsersService {
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save()
  }

  async getAll() {
    const allUsers = await this.userModel.find()
    return allUsers
  }

  async getByName(userName: string) {
    const user = await this.userModel.findOne({name: userName})
    return user
  }

  async getByPhoneNumber(userPhoneNumber: string) {
    const user = await this.userModel.findOne({phoneNumber: userPhoneNumber})
    return user
  }

  async updateByPhoneNumber(userPhoneNumber: string, updateUserDto: AuthUserDto) {
    const updatedUser = this.userModel.findOneAndUpdate({phoneNumber: userPhoneNumber}, updateUserDto, { new: true });
    return updateUserDto
  }

  async setAdmin(userName: string) {
    const user = this.userModel.findOneAndUpdate({name: userName}, {roles: [RolesEnum.Admin, RolesEnum.User]}, {new: true})
    return user
  }

  async deleteByName(userName: string) {
    const deletedUser = await this.userModel.deleteOne({Name: userName})
    return deletedUser
  }

  async validateUserName(userName: string) {
    let pattern1 = new RegExp('^[\W\d]?')
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesAuthGuard } from 'src/auth/roles-guard/roles-auth.guard';
import { Roles } from 'src/auth/roles-guard/roles-auth.decorator';
import { RolesEnum } from './schemas/roles.enum';
import { MessagePattern } from '@nestjs/microservices';
import { AccessDto } from 'src/auth/dto/tokens.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesAuthGuard)
  @Roles(RolesEnum.Admin)
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':username')
  findOne(@Param('username') userName: string) {
    return this.usersService.getByName(userName)
  }

  @Patch('admin/:username') 
  setAdmin(@Param('username') userName: string) {
    return this.usersService.setAdmin(userName)
  }

  @Delete(':username')
  remove(@Param('username') userName: string) {
    return this.usersService.deleteByName(userName);
  }

  @MessagePattern({ role: 'users', cmd: 'get'})
  async getIdByToken(tokensDto: AccessDto) {
      const response = this.usersService.getIdByToken(tokensDto.access)
      return response
  }
}

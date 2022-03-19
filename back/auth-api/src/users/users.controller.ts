import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesAuthGuard } from 'src/auth/roles-guard/roles-auth.guard';
import { Roles } from 'src/auth/roles-guard/roles-auth.decorator';
import { RolesEnum } from './schemas/roles.enum';

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
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { RolesGuard } from 'src/auth/roles-guard/roles.guard';
import { Roles } from 'src/auth/roles-guard/roles-auth.decorator';
import { RolesEnum } from './schemas/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Admin)
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':name')
  findOne(@Param('name') userName: string) {
    return this.usersService.getByName(userName)
  }

  @Patch('admin/:name') 
  setAdmin(@Param('name') userName: string) {
    return this.usersService.setAdmin(userName)
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.usersService.deleteByName(name);
  }
}

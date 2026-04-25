import type { Types } from 'mongoose';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id: Types.ObjectId) {
    return await this.userService.findById(id, { password: 0 });
  }

  @Delete('delete-by-id/:id')
  async deleteById(@Param('id') id: Types.ObjectId) {
    return await this.userService.deleteById(id);
  }
}

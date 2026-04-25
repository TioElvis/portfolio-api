import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id: Types.ObjectId) {
    return await this.userService.findById(id);
  }

  @Get('find-all')
  async findAll() {
    return await this.userService.findAll();
  }

  @Delete('delete-by-id/:id')
  async deleteById(@Param('id') id: Types.ObjectId) {
    return await this.userService.deleteById(id);
  }
}

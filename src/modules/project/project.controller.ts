import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { ProjectService } from './project.service';

import { QueryProjectDto } from './dto/query-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateProjectDto) {
    return await this.projectService.create(body);
  }

  @Get('find')
  async find(@Query() query: QueryProjectDto) {
    return await this.projectService.find(query);
  }
}

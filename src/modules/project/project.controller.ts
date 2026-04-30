import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ProjectService } from './project.service';

import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateProjectDto) {
    return await this.projectService.create(body);
  }
}

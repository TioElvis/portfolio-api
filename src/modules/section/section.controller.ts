import type { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateSectionDto } from './dto/create-section.dto';

import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateSectionDto) {
    return this.sectionService.create(body);
  }

  @Get('find-by-project-id/:projectId')
  async findByProjectId(@Param('projectId') projectId: Types.ObjectId) {
    return this.sectionService.findByProjectId(projectId);
  }

  @Get('find-by-project-slug-and-section-slug/:projectSlug/:sectionSlug')
  async findByProjectSlugAndSectionSlug(
    @Param('projectSlug') projectSlug: string,
    @Param('sectionSlug') sectionSlug: string,
  ) {
    return await this.sectionService.findByProjectSlugAndSectionSlug(
      projectSlug,
      sectionSlug,
    );
  }
}

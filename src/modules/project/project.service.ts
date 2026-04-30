import type { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';

import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(body: CreateProjectDto) {
    const existingProject = await this.projectModel
      .findOne({ slug: body.slug })
      .exec();

    if (existingProject) {
      throw new BadRequestException('Project with this slug already exists.');
    }

    try {
      const payload: Project = { ...body };

      // FIXME: Before to create project check if the repositoryUrl is valid and accessible
      const project = await this.projectModel.create(payload);

      return { message: 'Project created successfully.', data: project };
    } catch (error) {
      console.error('Error creating project:', error);
      throw new BadRequestException('Failed to create project.');
    }
  }
}

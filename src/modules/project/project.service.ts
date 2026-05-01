import type { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

import { QueryProjectDto } from './dto/query-project.dto';
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

  async find(query: QueryProjectDto) {
    const filter: Record<string, any> = {};

    if (query.languages) filter.languages = { $in: query.languages };
    if (query.title) filter.title = { $regex: query.title, $options: 'i' };

    const page = Math.max(1, query.page ?? 1);
    const limit = Math.max(1, query.limit ?? 10);

    const skip = (page - 1) * limit;

    try {
      const [data, total] = await Promise.all([
        this.projectModel
          .find(filter, { sections: 0 })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean<Project[]>()
          .exec(),
        this.projectModel.countDocuments(filter).exec(),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        message: 'Projects founds.',
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          next: page < totalPages ? page + 1 : null,
          prev: page > 1 ? page - 1 : null,
        },
      };
    } catch (error) {
      console.error('Error finding projects:', error);
      throw new BadRequestException('Failed to find projects.');
    }
  }
}

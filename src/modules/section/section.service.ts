import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ProjectService } from '@/modules/project/project.service';

import { CreateSectionDto } from './dto/create-section.dto';

import { Section, SectionDocument } from './section.schema';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    private projectService: ProjectService,
  ) {}

  async create(body: CreateSectionDto) {
    const [parent, project] = await Promise.all([
      body.parentId ? this.findById(body.parentId) : null,
      this.projectService.findById(body.projectId),
    ]);

    if (parent?.data.parent) {
      throw new BadRequestException(
        'Cannot create a section under a child section. Only two levels of nesting are allowed.',
      );
    }

    const existingSection = await this.sectionModel
      .findOne({
        slug: body.slug,
        project: project.data._id,
        parent: parent ? parent.data._id : null,
      })
      .exec();

    if (existingSection) {
      throw new BadRequestException(
        'A section with this slug already exists at the same level.',
      );
    }

    const payload: Section = {
      ...body,
      project: project.data._id,
      parent: parent ? parent.data._id : undefined,
    };

    const section = new this.sectionModel(payload);

    if (body.parentId) {
      if (parent?.data.slug === body.slug) {
        throw new BadRequestException(
          'Parent have the same slug as the new section.',
        );
      }
    }

    try {
      await section.save();

      return { message: 'Section created successfully.', data: section };
    } catch (error) {
      console.error('Error creating section:', error);
      throw new BadRequestException('Failed to create section.');
    }
  }

  async findByProjectId(projectId: Types.ObjectId) {
    const project = await this.projectService.findById(projectId);

    const sections = await this.sectionModel
      .find({ project: project.data._id })
      .exec();

    // FIXME: Build a tree structure from the flat list of sections

    return { message: 'Sections found.', data: sections };
  }

  async findById(id: Types.ObjectId | string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid section ID.');
    }

    const section = await this.sectionModel.findById(id).exec();

    if (!section) {
      throw new NotFoundException('Section not found.');
    }

    return { message: 'Section found.', data: section };
  }
}

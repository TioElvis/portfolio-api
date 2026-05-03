import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GithubModule } from '@/modules/github/github.module';
import { Section, SectionSchema } from '@/modules/section/section.schema';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Section.name, schema: SectionSchema },
    ]),
    GithubModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}

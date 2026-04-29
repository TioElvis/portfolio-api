import type { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProjectDocument = HydratedDocument<Project>;

export enum Languages {
  TYPESCRIPT = 'TypeScript',
  JAVASCRIPT = 'JavaScript',
  C = 'C',
  GO = 'Go',
  CPP = 'C++',
  RUST = 'Rust',
  JAVA = 'Java',
  PYTHON = 'Python',
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  markdown: string;

  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @Prop({ type: [{ type: String }], default: [] })
  tags: string[];

  @Prop({ type: [{ type: String, enum: Languages }], required: true })
  languages: Languages[];

  @Prop({ type: String, unique: true, required: true })
  repositoryUrl: string;

  @Prop({ type: String })
  demoUrl?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.index({ tags: 1 });
ProjectSchema.index({ title: 1 });
ProjectSchema.index({ languages: 1, tags: 1 });

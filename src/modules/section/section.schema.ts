import { type HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Project } from '@/modules/project/project.schema';

export type SectionDocument = HydratedDocument<Section>;

@Schema({ timestamps: true })
export class Section {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: String, required: true })
  markdown: string;

  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  project: Types.ObjectId | Project;

  @Prop({ type: Types.ObjectId, ref: Section.name })
  parent?: Types.ObjectId | Section;
}

export const SectionSchema = SchemaFactory.createForClass(Section);

SectionSchema.index({ slug: 1 });
SectionSchema.index({ title: 1 });
SectionSchema.index({ parent: 1 });
SectionSchema.index({ project: 1 });

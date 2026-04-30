import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { Languages } from '../project.schema';

export class CreateProjectDto {
  @MaxLength(24)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(250)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  markdown: string;

  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString({ each: true })
  @IsNotEmpty()
  tags: string[];

  @IsEnum(Languages, { each: true })
  @IsNotEmpty()
  languages: Languages[];

  @IsString()
  @IsNotEmpty()
  repositoryUrl: string;

  @IsString()
  @IsOptional()
  demoUrl?: string;
}

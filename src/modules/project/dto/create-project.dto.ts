import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
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

  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase, alphanumeric, and can contain hyphens',
  })
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
  @IsOptional()
  demoUrl?: string;
}

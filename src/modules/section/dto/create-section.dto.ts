import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import type { Types } from 'mongoose';

export class CreateSectionDto {
  @MaxLength(24)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase, alphanumeric, and can contain hyphens',
  })
  @MaxLength(32)
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  markdown: string;

  /* [REF ATTRIBUTES] */

  @IsMongoId()
  @IsNotEmpty()
  projectId: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  parentId?: Types.ObjectId;
}

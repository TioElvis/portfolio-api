import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  password: string;
}

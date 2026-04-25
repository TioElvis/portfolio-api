import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  password: string;
}

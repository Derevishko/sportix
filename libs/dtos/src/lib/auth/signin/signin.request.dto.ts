import { IsNotEmpty, IsString } from 'class-validator';

export class SigninRequestDto {
  @IsNotEmpty()
  @IsString()
  emailOrTagName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

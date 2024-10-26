import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '@sportix/enum';

export class SignupRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6) // Минимальная длина пароля
  password: string;

  @IsNotEmpty()
  @IsString()
  tagName: string;

  @IsEnum(UserRole)
  role?: UserRole;
}

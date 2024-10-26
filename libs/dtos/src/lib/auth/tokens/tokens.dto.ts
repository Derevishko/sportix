import { IsString } from 'class-validator';

export class TokensDto {
  @IsString()
  access: string;

  @IsString()
  refresh: string;
}

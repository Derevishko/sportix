import { AuthService } from '@modules/auth/service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SigninRequestDto, SignupRequestDto } from '@sportix/dtos';
import { HttpStatusCode } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signin')
  async sigin(@Body() body: SigninRequestDto) {
    return this.service.signin(body);
  }

  @Post('signup')
  @HttpCode(HttpStatusCode.Created)
  async sigup(@Body() body: SignupRequestDto) {
    return this.service.signup(body);
  }
}

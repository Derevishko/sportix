import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SigninRequestDto, SignupRequestDto, TokensDto } from '@sportix/dtos';
import { JwtService } from '@sportix/jwt';

import { AuthRepository } from '../repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) {}

  async signin(body: SigninRequestDto): Promise<TokensDto> {
    const { emailOrTagName, password } = body;

    const user = await this.authRepository.findForSignin(emailOrTagName);

    if (user && (await bcrypt.compare(password, user.password))) {
      const [access, refresh] = await Promise.all([
        this.jwtService.signAccessToken({}),
        this.jwtService.signRefreshToken({}),
      ]);

      return { access, refresh };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async signup(body: SignupRequestDto): Promise<void> {
    await this.authRepository.signup(body);
  }
}

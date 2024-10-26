import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { createSigner, createVerifier, TokenError } from 'fast-jwt';
import { JwtConfigType } from '../../types';
import { JwtConfig } from '../../config';

@Injectable()
export class JwtService {
  constructor(@Inject(JwtConfig.KEY) private readonly config: JwtConfigType) {}

  private get accessSecret(): string {
    return this.config.accessSecret;
  }

  private get refreshSecret(): string {
    return this.config.refreshSecret;
  }

  private get accessExpiresIn(): string {
    return this.config.accessExpiresIn;
  }

  private get refreshExpiresIn(): string {
    return this.config.refreshExpiresIn;
  }

  async signAccessToken<T>(payload: T): Promise<string> {
    const sign = createSigner({
      key: async () => this.accessSecret,
      expiresIn: this.accessExpiresIn,
    });

    try {
      return await sign({ ...payload, iat: Date.now() });
    } catch {
      throw new UnauthorizedException('Access token creation failed.');
    }
  }

  async signRefreshToken<T>(payload: T): Promise<string> {
    const sign = createSigner({
      key: async () => this.refreshSecret,
      expiresIn: this.refreshExpiresIn,
    });

    try {
      return await sign({ ...payload, iat: Date.now() });
    } catch {
      throw new UnauthorizedException('Refresh token creation failed.');
    }
  }

  async verifyAccessToken<T>(token: string): Promise<T> {
    const verify = createVerifier({ key: async () => this.accessSecret });

    try {
      const payload: T = await verify(token);
      return payload;
    } catch (err) {
      if ((err as TokenError)?.code === TokenError.codes.expired) {
        throw new UnauthorizedException('Access token is expired.');
      }
      throw new UnauthorizedException('Access token is not correct.');
    }
  }

  async verifyRefreshToken<T>(token: string): Promise<T> {
    const verify = createVerifier({ key: async () => this.refreshSecret });

    try {
      const payload: T = await verify(token);
      return payload;
    } catch (err) {
      if ((err as TokenError)?.code === TokenError.codes.expired) {
        throw new UnauthorizedException('Refresh token is expired.');
      }
      throw new UnauthorizedException('Refresh token is not correct.');
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const payload = await this.verifyRefreshToken(refreshToken); // Проверяем refresh токен
    return this.signAccessToken(payload); // Создаем новый access токен
  }
}

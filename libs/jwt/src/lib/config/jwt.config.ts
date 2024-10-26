import { registerAs } from '@nestjs/config';
import { ConfigUtil } from '@sportix/config';
import * as Joi from 'joi';

import { JwtConfigType } from '../types';

export const JwtConfig = registerAs<JwtConfigType>('JWT', () => ({
  accessSecret: ConfigUtil.validate(
    process?.env?.['JWT_ACCESS_SECRET'],
    Joi.string().required()
  ),
  refreshSecret: ConfigUtil.validate(
    process?.env?.['JWT_REFRESH_SECRET'],
    Joi.string().required()
  ),
  accessExpiresIn: ConfigUtil.validate(
    process?.env?.['JWT_ACCESS_EXPIRES_IN'],
    Joi.string().required()
  ),
  refreshExpiresIn: ConfigUtil.validate(
    process?.env?.['JWT_REFRESH_EXPIRES_IN'],
    Joi.string().required()
  ),
}));

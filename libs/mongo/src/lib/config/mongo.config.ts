import { registerAs } from '@nestjs/config';
import { ConfigUtil } from '@sportix/config';
import * as Joi from 'joi';

import { MongoConfigType } from '../types';

export const MongoConfig = registerAs<MongoConfigType>('MONGO', () => ({
  name: ConfigUtil.validate(
    process?.env?.['MONGO_NAME'],
    Joi.string().required()
  ),
  protocol: ConfigUtil.validate(
    process?.env?.['MONGO_PROTOCOL'],
    Joi.string().default('mongodb')
  ),
  host: ConfigUtil.validate(
    process?.env?.['MONGO_HOST'],
    Joi.string().default('localhost')
  ),
  port: ConfigUtil.validate(
    process?.env?.['MONGO_PORT'],
    Joi.number().integer().default(27017)
  ),
  user: ConfigUtil.validate(
    process?.env?.['MONGO_USER'],
    Joi.string().required()
  ),
  password: ConfigUtil.validate(
    process?.env?.['MONGO_PASSWORD'],
    Joi.string().required()
  ),
}));

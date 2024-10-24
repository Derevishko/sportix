import Joi from 'joi';

export class ConfigUtil {
  static validate<T>(value: unknown, schema?: Joi.Schema<T>): T {
    if (schema) {
      const { error } = schema.validate(value);

      if (error) {
        throw error;
      }
    }

    return value as T;
  }
}

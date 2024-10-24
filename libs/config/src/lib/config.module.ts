import { Module } from '@nestjs/common';
import {
  ConfigFactory,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

@Module({})
export class ConfigModule {
  static forRoot(...configs: ConfigFactory[]) {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          envFilePath: `${process.cwd()}/${
            process?.env?.['NODE_ENV'] === 'test' ? '.env.test' : '.env'
          }`,
          load: configs,
        }),
      ],
    };
  }
}

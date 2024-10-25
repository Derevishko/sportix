import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig } from './config';
import { MongoConfigType } from './types';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [MongoConfig.KEY],
      useFactory: (config: MongoConfigType) => ({
        dbName: config.name,
        user: config.user,
        pass: config.password,
        uri: `${config.protocol}://${config.host}:${config.port}`,
      }),
    }),
  ],
})
export class MongoModule {}

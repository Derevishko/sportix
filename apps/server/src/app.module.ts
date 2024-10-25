import { Module } from '@nestjs/common';
import { ConfigModule } from '@sportix/config';
import { MongoConfig, MongoModule } from '@sportix/mongo';

@Module({
  imports: [ConfigModule.forRoot(MongoConfig), MongoModule],
})
export class AppModule {}

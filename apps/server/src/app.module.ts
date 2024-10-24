import { Module } from '@nestjs/common';
import { ConfigModule } from '@sportix/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}

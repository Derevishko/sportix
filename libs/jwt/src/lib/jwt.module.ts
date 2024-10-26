import { Module } from '@nestjs/common';
import { ConfigModule } from '@sportix/config';
import { JwtConfig } from './config';
import { JwtService } from './services';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(JwtConfig)],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}

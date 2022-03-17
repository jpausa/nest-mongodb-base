import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './providers/app-config.service';

const env = process.env.NODE_ENV || '';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${env}.env`, isGlobal: true }),
  ],
  controllers: [],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}

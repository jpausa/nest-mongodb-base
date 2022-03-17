import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../app-config-module/app-config.module';
import { AppConfigService } from '../app-config-module/providers/app-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        uri: `${configService.mongoDBConfig.mongoDBBaseUrl}${configService.mongoDBConfig.mongoDBPort}/${configService.mongoDBConfig.mongoDBName}`,
      }),
    }),
  ],
})
export class DatabaseModule {}

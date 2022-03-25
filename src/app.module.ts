import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config-module/app-config.module';
import { MongoTestModule } from './mongo-test/mongo-test.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AppConfigModule, MongoTestModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

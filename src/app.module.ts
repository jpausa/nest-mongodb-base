import { Module } from '@nestjs/common';
import { TestModule } from './test-module/test-module';
import { AppConfigModule } from './app-config-module/app-config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TestModule, AppConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

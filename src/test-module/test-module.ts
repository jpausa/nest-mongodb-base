import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config-module/app-config.module';
import { TestController } from './controllers/test.controller';
import { TestService } from './providers/test.service';

@Module({
  imports: [AppConfigModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}

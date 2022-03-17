import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './app-config-module/providers/app-config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);
  const logger = new Logger('bootstrap');
  await app.listen(config.generalConfig.serverPort);
  logger.log(`Server started on port ${config.generalConfig.serverPort}`);
}
bootstrap();

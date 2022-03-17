import { Injectable } from '@nestjs/common';
import { iGeneralConfig } from '../interfaces/general-config.interface';
import { iMongoDBConfig } from '../interfaces/mongodb-config.interfaces';

@Injectable()
export class AppConfigService {
  get generalConfig(): iGeneralConfig {
    return {
      serverPort: parseInt(process.env.SERVER_PORT, 10) || 3000,
    };
  }

  get mongoDBConfig(): iMongoDBConfig {
    return {
      mongoDBBaseUrl: process.env.MONGODB_BASE_URL,
      mongoDBPort: process.env.MONGODB_PORT,
      mongoDBName: process.env.MONGODB_DB_NAME,
      mongoDBUser: process.env.MONGODB_USER,
      mongoDBPassword: process.env.MONGODB_PASSWORD,
    };
  }
}

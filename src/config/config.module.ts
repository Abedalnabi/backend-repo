// src/config/config.module.ts
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';

export const AppConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `${__dirname}/../../.env.${process.env.NODE_ENV ?? 'development'}`,
  load: [databaseConfig],
});

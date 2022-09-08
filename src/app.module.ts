import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyConfiguration } from './configuration/easyConfig.service';
import { DatabaseConfigurations } from './utils/database/database';
import { PeopleModule } from './people/people.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    EasyconfigModule.register({
      path: `environment/.env.${process.env.NODE_ENV}`,
      safe: true,
    }),
    TypeOrmModule.forRootAsync(DatabaseConfigurations),
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService, EasyConfiguration],
})
export class AppModule {}

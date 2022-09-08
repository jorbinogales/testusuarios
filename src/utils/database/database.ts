import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PeopleEntity } from '../../people/entities/people.entity';

export const DatabaseConfigurations: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      port: configService.get<number>('DB_PORT'),
      synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
      migrationsTableName: 'Migrations_History',
      entities: [PeopleEntity],
    };
  },
};

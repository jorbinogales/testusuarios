import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmExModule } from '../utils/typeorm-ex.module';
import { PeopleRepository } from './repository/people.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PeopleRepository])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}

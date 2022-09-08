import { Repository } from 'typeorm';
import { CustomRepository } from '../../utils/typeorm-ex.decorator';
import { CreatePeopleDto } from '../dto/create-people.dto';
import { UpdatePeopleDto } from '../dto/update-people.dto';

import { PeopleEntity } from '../entities/people.entity';

@CustomRepository(PeopleEntity)
export class PeopleRepository extends Repository<PeopleEntity> {

  async register(createPeopleDto: CreatePeopleDto): Promise<PeopleEntity> {
    const { firstname, lastname, dni, email, country } = createPeopleDto;
    const people = this.create({
      firstname,
      lastname,
      dni,
      email,
      country,
    });
    return await this.save(people);
  }

  async deletePeople(people: PeopleEntity): Promise<any> {
    people.deleted_at = new Date();
    await this.save(people);
    return {
      statusCode: 200,
    };
  }

   async updatePeople(
    updatePeopleDto: UpdatePeopleDto,
    people: PeopleEntity,
  ): Promise<any> {
    const { firstname, lastname, dni, email, country } = updatePeopleDto;

    people.firstname = firstname;
    people.lastname = lastname;
    people.dni = dni;
    people.email =email;
    people.country = country;
    this.save(people);

    return {
      statusCode: 200,
    };
  }
}

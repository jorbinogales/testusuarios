import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { PeopleEntity } from './entities/people.entity';
import { PeopleRepository } from './repository/people.repository';
import { PageDto } from './dto/page.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageMetaDto } from './dto/page-meta.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleRepository)
    private readonly _peopleRepository: PeopleRepository,
  ) {}

  async create(createPeopleDto: CreatePeopleDto): Promise<PeopleEntity> {
    return await this._peopleRepository.register(createPeopleDto);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PeopleEntity>> {
    const videos = this._peopleRepository
      .createQueryBuilder('people')
      .where('people.deleted_at IS NOT NULL');

    videos
      .orderBy('people.id', 'DESC')
      .take(pageOptionsDto.Take)
      .skip(pageOptionsDto.Skip);

    const itemCount = await videos.getCount();
    const { entities } = await videos.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async getById(id: number): Promise<PeopleEntity> {
    const people = await this._peopleRepository
      .createQueryBuilder('people')
      .where('people.id = :id', {
        id,
      })
      .getOne();
    if (!people) {
      throw new HttpException('People not exists', 404);
    }
    return people;
  }

  async delete(id: number): Promise<PeopleEntity> {
    const people = await this.getById(id);
    return await this._peopleRepository.deletePeople(people);
  }

  async update(id: number, updatePeopleDto: UpdatePeopleDto): Promise<any> {
    const people = await this.getById(id);
    return await this._peopleRepository.updatePeople(updatePeopleDto, people);
  }
}

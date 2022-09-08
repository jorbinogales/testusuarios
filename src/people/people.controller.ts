import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

import { PeopleEntity } from './entities/people.entity';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageDto } from './dto/page.dto';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a people' })
  async create(
    @Body() createPeopleDto: CreatePeopleDto,
  ): Promise<PeopleEntity> {
    return await this.peopleService.create(createPeopleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all people paginate' })
  async findAll(@Query() pageOptionDto: any): Promise<PageDto<PeopleEntity>> {
    return await this.peopleService.findAll(new PageOptionsDto(pageOptionDto));
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get one people' })
  async getOne(@Param('id') id: string): Promise<PeopleEntity> {
    return await this.peopleService.getById(+id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete one people' })
  async deletePeople(@Param('id') id: string): Promise<PeopleEntity> {
    return await this.peopleService.delete(+id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update one people' })
  async updatePeople(
    @Param('id') id: string,
    @Body() updatePeopleDto: UpdatePeopleDto,
  ): Promise<any> {
    return await this.peopleService.update(+id, updatePeopleDto);
  }
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePeopleDto {
  @IsString({ message: 'firstname is required' })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'first name of people',
    default: 'Oscar',
  })
  firstname: string;

  @IsString({ message: 'lastname is required' })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'last name of people',
    default: 'Padilla',
  })
  lastname: string;

  @IsString({ message: 'country is required' })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'country of people',
    default: 'Venezuela',
  })
  country: string;

  @IsString({ message: 'dni is required' })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'dni  of people',
    default: '255335',
  })
  dni: string;

  @IsString({ message: 'email is required' })
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'country of people',
    default: 'oscar.padilla@example.com',
  })
  email: string;
}

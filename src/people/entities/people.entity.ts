import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('people')
export class PeopleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'firstname',
    type: 'varchar',
  })
  firstname: string;

  @Column({
    name: 'lastname',
    type: 'varchar',
  })
  lastname: string;

  @Column({
    name: 'dni',
    type: 'varchar',
  })
  dni: string;

  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @Column({
    name: 'country',
    type: 'varchar',
  })
  country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}

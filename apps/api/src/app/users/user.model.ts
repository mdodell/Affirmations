import {
  AllowNull,
  Column,
  HasMany,
  IsEmail,
  Model,
  Table,
} from 'sequelize-typescript';
import { Affirmation } from '../affirmations/models/affirmation.model';
import { Receiver } from '../receivers/models/receiver.model';

@Table
export class User extends Model {
  @IsEmail
  @Column({
    unique: {
      name: 'email',
      msg: 'Email must be unique',
    },
  })
  email: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  password: string;

  @HasMany(() => Affirmation)
  affirmations: Affirmation[];

  @HasMany(() => Receiver)
  receivers: Receiver[];
}

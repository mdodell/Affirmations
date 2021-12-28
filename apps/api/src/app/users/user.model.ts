import { Column, HasMany, IsEmail, Model, Table } from 'sequelize-typescript';
import { Affirmation } from '../affirmations/models/affirmation.model';

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

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  password: string;

  @HasMany(() => Affirmation)
  affirmations: Affirmation[];
}

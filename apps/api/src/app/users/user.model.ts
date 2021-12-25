import { Column, IsEmail, Model, Table } from 'sequelize-typescript';

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
}

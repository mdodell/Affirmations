import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
  BelongsTo,
  AllowNull,
  IsEmail,
} from 'sequelize-typescript';
import { Affirmation } from '../../affirmations/models/affirmation.model';
import { User } from '../../users/user.model';

@Table
export class Receiver extends Model {
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @ForeignKey(() => User)
  userId: User['id'];

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Affirmation)
  affirmations: Affirmation[];
}

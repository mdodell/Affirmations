import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/user.model';

@Table
export class Affirmation extends Model {
  @Column
  message: string;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

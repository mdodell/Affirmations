import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Receiver } from '../../receivers/models/receiver.model';
import { User } from '../../users/user.model';

@Table
export class Affirmation extends Model {
  @Column
  message: string;

  @ForeignKey(() => User)
  userId: User['id'];

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Receiver)
  receiverId: number;

  @BelongsTo(() => Receiver)
  receiver: Receiver;
}

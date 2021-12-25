import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

import * as bcrypt from 'bcrypt';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectModel(User) private userModel: typeof User) {}

  @Cron('* * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 1');
  }

  async create(user: User): Promise<User | void> {
    const { password, ...rest } = user;

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return this.userModel.create({
      password: hashedPassword,
      ...rest,
    });
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }
}

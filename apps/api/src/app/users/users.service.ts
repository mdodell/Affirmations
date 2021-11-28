import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(user: User): Promise<User> {
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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../../dtos/user.dto';
import { User, UserDocument } from '../../schemas/user.schema';

export type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private readonly users: User[] = [
    {
      email: 'test@test.com',
      password: 'changemetest',
    },
    {
      email: 'hello@hello.com',
      password: 'guess',
    },
  ];

  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}

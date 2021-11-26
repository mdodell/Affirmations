import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  email: string;
  password: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      email: 'test@test.com',
      password: 'changemetest',
    },
    {
      userId: 2,
      email: 'hello@hello.com',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}

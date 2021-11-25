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
      email: 'dodellmitchell@gmail.com',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'mdodell@brandeis.edu',
      password: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}

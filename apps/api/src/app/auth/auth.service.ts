import { Injectable } from '@nestjs/common';
import { UsersService, UserWithoutPassword } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<UserWithoutPassword> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { userId, username } = user;
      return {
        userId,
        username,
      };
    }
    return null;
  }

  async login(user: UserWithoutPassword) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

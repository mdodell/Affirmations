import { Injectable } from '@nestjs/common';
import {
  User,
  UsersService,
  UserWithoutPassword,
} from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signUp(user: User) {
    return await this.mailService.sendConfirmation(user);
  }

  async validateUser(
    email: string,
    pass: string
  ): Promise<UserWithoutPassword> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { userId, email } = user;
      return {
        userId,
        email,
      };
    }
    return null;
  }

  async login(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

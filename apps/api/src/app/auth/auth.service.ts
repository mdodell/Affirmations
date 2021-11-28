import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { User } from '../users/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signUp(user: User) {
    await this.usersService.create(user);
    return await this.mailService.sendConfirmation(user);
  }

  async validateUser(email: string, pass: string): Promise<{ email: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(pass, user.password);

    if (isValidPassword) {
      const { email } = user;
      return {
        email,
      };
    }
  }

  async login(email: User['email']) {
    return {
      access_token: this.jwtService.sign({ email }),
    };
  }
}

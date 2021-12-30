import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    await this.usersService.create(user).catch((error) => {
      throw new UnauthorizedException({
        statusCode: 500,
        error,
      });
    });
    await this.mailService.sendConfirmation(user);
    const { email, firstName, lastName } = user;
    return {
      email,
      firstName,
      lastName,
    };
  }

  async validateUser(
    email: string,
    pass: string
  ): Promise<{
    email: string;
    firstName: string;
    lastName: string;
    id: string;
  }> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(pass, user.password);

    if (isValidPassword) {
      const { email, firstName, lastName, id } = user;
      return {
        email,
        firstName,
        lastName,
        id,
      };
    }
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(user),
      ...user,
    };
  }
}

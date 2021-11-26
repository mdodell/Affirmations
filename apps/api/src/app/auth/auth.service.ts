import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { UserDto } from '../../dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signUp(user: UserDto) {
    await this.usersService.create(user);
    return await this.mailService.sendConfirmation(user);
  }

  async validateUser(
    email: string,
    pass: string
  ): Promise<Omit<UserDto, 'password'>> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { email } = user;
      return {
        email,
      };
    }
    return null;
  }

  async login(email: UserDto['email']) {
    return {
      access_token: this.jwtService.sign({ email }),
    };
  }
}

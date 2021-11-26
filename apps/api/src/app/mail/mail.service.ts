import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../../dtos/user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmation(user: UserDto) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to E-ffirmations',
      template: './confirmation',
      context: {
        name: user.email,
      },
    });
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/users.service';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmation(user: User) {
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

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AffirmationsService } from '../affirmations/affirmations.service';
import { Affirmation } from '../affirmations/models/affirmation.model';
import { Receiver } from '../receivers/models/receiver.model';
import { User } from '../users/user.model';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService // private affirmationService: AffirmationsService
  ) {}

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

  async sendAffirmationWelcomeMessage(receiver: Receiver, user: User) {
    await this.mailerService.sendMail({
      to: receiver.email,
      subject: `Your E-firrmation from ${user.firstName} ${user.lastName}`,
      template: './affirmationSignUp',
      context: {
        fullName: `${user.firstName} ${user.lastName}`,
      },
    });
  }

  async sendAffirmation(
    receiver: Receiver,
    affirmation: Affirmation,
    user: User
  ) {
    await this.mailerService.sendMail({
      to: receiver.email,
      subject: `Your Daily E-firrmation from ${user.firstName} ${user.lastName}`,
      template: './affirmation',
      context: {
        message: affirmation.message,
      },
    });
  }
}

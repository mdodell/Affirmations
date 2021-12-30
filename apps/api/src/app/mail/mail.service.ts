import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
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

  async sendUnsubscribeMessage(receiver: Receiver) {
    await this.mailerService.sendMail({
      to: receiver.email,
      subject: 'You have been unsubscribed from E-ffirmations!',
      template: './unsubscribe',
      context: {
        URL: process.env.URL,
        token: receiver.subscriptionToken,
        fullName: `${receiver.firstName} ${receiver.lastName}`,
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
        URL: process.env.URL,
        fullName: `${user.firstName} ${user.lastName}`,
        message: affirmation.message,
        subscriptionToken: receiver.subscriptionToken,
      },
    });
  }
}

import { Module } from '@nestjs/common';
import { AffirmationsService } from './affirmations.service';
import { AffirmationsController } from './affirmations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Affirmation } from './models/affirmation.model';
import { ReceiversModule } from '../receivers/receivers.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [SequelizeModule.forFeature([Affirmation]), ReceiversModule],
  controllers: [AffirmationsController],
  providers: [AffirmationsService, MailService],
})
export class AffirmationsModule {}

import { Module } from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { ReceiversController } from './receivers.controller';
import { Receiver } from './models/receiver.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [SequelizeModule.forFeature([Receiver])],
  controllers: [ReceiversController],
  providers: [ReceiversService, MailService],
  exports: [ReceiversService],
})
export class ReceiversModule {}

import { Module } from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { ReceiversController } from './receivers.controller';
import { Receiver } from './models/receiver.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailService } from '../mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ReceiverTokenStrategy } from './receiverToken.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([Receiver]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_RECEIVER_SECRET,
    }),
  ],
  controllers: [ReceiversController],
  providers: [ReceiversService, MailService, ReceiverTokenStrategy],
  exports: [ReceiversService],
})
export class ReceiversModule {}

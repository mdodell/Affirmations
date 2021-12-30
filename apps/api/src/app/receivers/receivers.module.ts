import { Module } from '@nestjs/common';
import { ReceiversService } from './receivers.service';
import { ReceiversController } from './receivers.controller';
import { Receiver } from './models/receiver.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailService } from '../mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PassportModule } from '@nestjs/passport';
import { ReceiverTokenStrategy } from './receiverToken.stategy';

@Module({
  imports: [
    SequelizeModule.forFeature([Receiver]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ReceiversController],
  providers: [ReceiversService, MailService, ReceiverTokenStrategy],
  exports: [ReceiversService],
})
export class ReceiversModule {}

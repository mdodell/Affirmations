import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Receiver } from './models/receiver.model';

@Injectable()
export class ReceiverTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: 'TestingSecret',
    });
  }

  async validate(receiver: Receiver) {
    return receiver;
  }
}

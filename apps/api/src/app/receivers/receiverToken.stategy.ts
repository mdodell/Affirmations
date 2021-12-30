import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../auth/constants';
import { ReceiversService } from './receivers.service';

@Injectable()
export class ReceiverTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private receiversService: ReceiversService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(token: string) {
    const receiver = await this.receiversService.validateReceiver(token);
    console.log({ receiver });
    return true;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ReceiversService } from './receivers.service';

@Injectable()
export class ReceiverTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private receiversService: ReceiversService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: 'TestingSecret',
    });
  }

  async validate(token: string) {
    console.log({ token });
    const receiver = await this.receiversService.validateReceiver(token);
    if (!receiver) {
      throw new UnauthorizedException('This receiver was not authorized!');
    }
    return receiver;
  }
}

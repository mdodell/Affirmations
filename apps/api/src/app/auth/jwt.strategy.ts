import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from '../users/user.model';

import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => req.cookies.jwt,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(
    payload: User
  ): Promise<{
    email: User['email'];
    id: User['id'];
    firstName: User['firstName'];
    lastName: User['lastName'];
  }> {
    const { email, id, firstName, lastName } = payload;
    return { email, id, firstName, lastName };
  }
}

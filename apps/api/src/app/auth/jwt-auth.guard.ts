import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('AuthToken') {
  handleRequest(err, user, info, context, status) {
    console.log('JWTAuthGuard');
    console.log({ err, user, info, context, status });
    return super.handleRequest(err, user, info, context, status);
  }
}

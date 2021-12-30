import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ReceiverTokenGuard extends AuthGuard('jwt') {}

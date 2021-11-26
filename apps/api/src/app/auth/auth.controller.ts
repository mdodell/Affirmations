import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Res({ passthrough: true }) response: Response
  ): Promise<{ access_token: string }> {
    const jwt = await this.authService.login(email);

    response.cookie('jwt', jwt.access_token, { httpOnly: true });

    return jwt;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response) {
    response.clearCookie('jwt');
    response.clearCookie('_csrf');
  }

  @Get('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const newUser: Omit<User, 'userId'> = { email, password };
    return this.authService.signUp(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}

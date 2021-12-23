import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users/user.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Res({ passthrough: true }) response: Response
  ): Promise<{ access_token: string; email: string }> {
    const jwt = await this.authService.login(email);

    const data = {
      access_token: jwt.access_token,
      email,
    };

    response.cookie('jwt', data.access_token, {
      httpOnly: true,
    });
    response.cookie('email', data.email, {
      httpOnly: true,
    });

    return data;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response) {
    response.clearCookie('email');
    response.clearCookie('jwt');
  }

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const newUser = { email, password } as User;
    return this.authService.signUp(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}

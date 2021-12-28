import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users/user.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: Response
  ): Promise<{ access_token: string; email: string }> {
    const loginResponse = await this.authService.login(req.user);

    console.log({ loginResponse });
    const data = {
      access_token: loginResponse.access_token,
      email: loginResponse.email,
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
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string
  ) {
    const newUser = { email, password, firstName, lastName } as User;
    return this.authService.signUp(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(200)
  getProfile(@Request() req) {
    return {
      user: req.user,
      statusCode: 200,
    };
  }
}

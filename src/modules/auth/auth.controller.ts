import type { FastifyReply } from 'fastify';
import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.authService.signIn(body, response);
  }
}

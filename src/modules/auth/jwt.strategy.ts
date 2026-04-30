import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import type { FastifyRequest } from 'fastify';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: FastifyRequest) => {
          const cookie = request.cookies['jwt'];
          return cookie ? cookie : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { id: string }) {
    if (!payload.id) {
      throw new UnauthorizedException('Invalid token payload.');
    }

    try {
      await this.userService.findById(new Types.ObjectId(payload.id));
    } catch (error) {
      console.error('Error validating JWT:', error);
      throw new UnauthorizedException('Failed to validate token.');
    }

    return { userId: payload.id };
  }
}

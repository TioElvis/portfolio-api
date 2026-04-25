import { compare } from 'bcrypt';
import type { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import type { FastifyReply } from 'fastify';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';

import { COOKIE_EXPIRES_IN } from '@/lib/constants';
import { User, UserDocument } from '@/modules/user/user.schema';

import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(body: SignInDto, response: FastifyReply) {
    const user = await this.userModel
      .findOne({ username: body.username })
      .exec();

    if (!user || !(await compare(body.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const jwt = this.jwtService.sign({ id: user._id.toString() });

    response.setCookie('jwt', jwt, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_EXPIRES_IN,
      path: '/',
      domain: this.configService.get<string>('DOMAIN'),
    });

    return { message: 'Signed in successfully.' };
  }
}

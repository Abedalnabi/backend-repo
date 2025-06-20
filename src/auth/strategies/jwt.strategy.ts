// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CurrentUser } from '../interfaces/current-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    console.log('1');
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    console.log('2');

    const jwtExtractor: JwtFromRequestFunction =
      ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      jwtFromRequest: jwtExtractor,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload): Promise<CurrentUser> {
    if (!payload?.sub || !payload?.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return Promise.resolve({
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    });
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { CurrentUserInterface } from '../users/dto/current-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'testing_secret_key',
    });
  }

  async validate(payload: any): Promise<CurrentUserInterface> {
    // this.logger.debug('Called validate...');
    // this.logger.debug(payload);
    // retrieve user information...
    const email = payload.username;
    const userToken = payload.sub;
    const tokenExpiry = payload.exp;

    return {
      user: 'test user',
      tokenExpiry: new Date(tokenExpiry * 1000),
    };
  }
}

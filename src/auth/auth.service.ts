import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

const PASSWORD_SECRET = 'secret';

function getPasswordHash(password) {
  const hash = crypto
    .createHmac('sha256', PASSWORD_SECRET)
    .update(password)
    .digest('hex');
  return hash;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.auth(username, getPasswordHash(pass));
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.nickname, sub: user.id };
    return {
      user: {
        nickname: user.nickname,
        login: user.login,
        role: user.role,
        token: this.jwtService.sign(payload),
      },
    };
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async login(id: number) {
    const payload = { id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

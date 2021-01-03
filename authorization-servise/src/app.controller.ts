import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req) {
    const { id } = req.body;
    return this.authService.login(id);
  }
}
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    ) {}
}

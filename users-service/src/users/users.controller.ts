import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ICreateUser } from './interfaces/ICreateUser';
import { IUser } from './interfaces/IUser';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: ICreateUser): Promise<IUser> {
    const user = await this.usersService.create(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<IUser> {
    return this.usersService.findOne(id);
  }

  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
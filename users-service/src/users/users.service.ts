import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUser } from './interfaces/ICreateUser';
import { IUser } from './interfaces/IUser';
import { IUsersService } from './interfaces/IUsersService';
import { User } from './user.entity';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<IUser>,
  ) {}

  create(createUser: ICreateUser): Promise<IUser> {
    const user = new User();
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.phone = createUser.phone;
    user.login = createUser.login;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<IUser> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
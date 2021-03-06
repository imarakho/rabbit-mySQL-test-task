  
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './interfaces/IUser';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  login: string;
}
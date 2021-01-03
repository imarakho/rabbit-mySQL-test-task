import { ICreateUser } from "./ICreateUser";
import { IUser } from "./IUser";

export interface IUsersService {
  create(createUser: ICreateUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findOne(id: number): Promise<IUser>;
  remove(id: number): Promise<void>;
}
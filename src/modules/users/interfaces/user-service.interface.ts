import { User } from "../entities/user.entity";

export interface IUserService {
  findAll(): Promise<User[]>;
}

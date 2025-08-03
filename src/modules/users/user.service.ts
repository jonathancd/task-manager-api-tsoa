import { NotFoundException } from "../../shared/exceptions/app.exceptions";
import { User } from "./entities/user.entity";
import { IUserService } from "./interfaces/user-service.interface";
import { UserRepository } from "./user.repository";

export class UserService implements IUserService {
  public userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async delete(id: number): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    try {
      await this.userRepository.delete(id);

      return true;
    } catch (error) {
      return false;
    }
  }
}

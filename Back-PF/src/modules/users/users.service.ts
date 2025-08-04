import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
  return this.usersRepository.find({
    order: {
      created_at: 'ASC',
      id: 'ASC', // puedes cambiar por el campo que consideres más adecuado
    },
  });
}

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }
  async update(id: string, updateDto: Partial<UpdateUserDTO>): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) throw new NotFoundException("usuario no encontrado");
    Object.assign(user, updateDto);
    user.updated_at = new Date();
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

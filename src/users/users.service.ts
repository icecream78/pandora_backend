import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  list(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.nickname', 'users.role'])
      .where('role != :role', { role: 1 })
      .getMany();
  }

  async auth(username: string, password: string): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.nickname', 'users.role'])
      .where('login = :username AND password = :password', {
        username,
        password,
      })
      .getOne();
  }
}

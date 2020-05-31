import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  async getList(): Promise<Record<string, any>> {
    const users = await this.usersService.list();
    return { users: users };
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findById(Number(id));
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    };
  }
}

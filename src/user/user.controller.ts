// user.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(Number(id));
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return this.userService.toUserResponseDto(user);
  }
}

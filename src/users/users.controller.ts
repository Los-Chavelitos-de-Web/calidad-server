import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/User';
import { genHash } from 'src/utils/bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getAll')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('createUser')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() user: User) {
    user.password = await genHash(user.password);
    return this.userService.createUser(user);
  }
}

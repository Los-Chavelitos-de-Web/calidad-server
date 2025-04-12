import { Injectable } from '@nestjs/common';
import { User } from 'src/models/User';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  createUser(user: User) {
    return this.prisma.user.create({ data: user });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  getAllUsers() {
    return this.prismaService.user.findMany();
  }

  getProfileById(id: number) {
    return this.prismaService.profile.findUnique({
      where: { user_id: id },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserChangeIsActive } from '../../src/models/User';

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

  async changeIsActive(user: UserChangeIsActive) {
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: 'User not found',
      });
    }

    const u = await this.prismaService.user.update({
      where: { id: user.id },
      data: { isActive: user.isActive },
    });

    if (!u) {
      throw new NotFoundException({
        status: 404,
        message: 'User not found',
      });
    }

    return {
      status: 200,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
    };
  }
}

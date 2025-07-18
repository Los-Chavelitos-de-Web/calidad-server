import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  UserChangeDataProfile,
  UserChangeIsActive,
  UserChangeRole,
} from '../../src/models/User';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

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

  async update(id: number, user: UserChangeDataProfile) {
    if (!user) {
      throw new NotFoundException({
        status: 404,
        message: 'El perfil no se pudo actualizar, por favor intente más tarde.',
      });
    }

    const user_insert = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email: user?.email,
      },
    });

    const profile_insert = await this.prismaService.profile.update({
      where: {
        user_id: id,
      },
      data: {
        name: user?.name,
      },
    });

    if (user_insert || profile_insert) {
      return {
        ok: true,
        message: `Perfil [${id}] acutalizado correctamente.`,
      };
    }

    throw new NotFoundException({
      status: 400,
      message: 'El perfil no se pudo actualizar, por favor intente más tarde.',
    });
  }

  async changeIsActive(user: UserChangeIsActive) {
    if (!user || !user.id || user.isActive === undefined) {
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

  async changeRole(user: UserChangeRole) {
    try {
      if (!user || !user.id || !user.role) {
        throw new NotFoundException({
          status: 404,
          message: 'User not found',
        });
      }

      const u = await this.prismaService.user.update({
        where: { id: user.id },
        data: { role: user.role },
      });

      if (!u) {
        throw new NotFoundException({
          status: 404,
          message: 'User not found',
        });
      }

      return {
        status: 200,
        message: `User role changed to ${user.role} successfully`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new NotFoundException({
          status: 404,
          message: `Invalid role: ${user.role}`,
        });
      }

      throw new NotFoundException({
        status: 404,
        message: 'User not found',
      });
    }
  }
}

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLogin, UserRegister } from '../models/User';
import { PrismaService } from '../prisma.service';
import { comparePassword } from '../utils/bcrypt';
import { JWTConfig } from '../utils/jwt';
import { Prisma } from '../../prisma/generated';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JWTConfig,
  ) { }

  async register(user: UserRegister) {
    try {
      const r = await this.prisma.user.create({ data: user });
      return {
        message: 'User created successfully',
        data: r,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Puedes acceder a error.meta, error.code, etc.
        throw new NotFoundException({
          message: 'Error creating user',
          error: error.meta,
        });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // Error desconocido de Prisma
        throw new NotFoundException({
          message: 'Unknown error occurred during user creation',
          error: error.message,
        });
      } else {
        // Otros tipos de errores no relacionados con Prisma
        throw new NotFoundException({
          message: 'Unexpected error occurred',
          error: error,
        });
      }
    }
  }

  async login(user: UserLogin) {
    const u = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (u) {
      const authPassw = await comparePassword(user.password, u?.password);

      if (authPassw) {
        const payload = { userId: u.id, username: u.name, role: u.role };

        return {
          token: await this.jwtService.signAsync(
            payload,
            this.jwtConfig.getConfig(),
          ),
        };
      } else {
        throw new UnauthorizedException({
          status: 401,
          message: 'Password incorrect',
        });
      }
    } else {
      throw new UnauthorizedException({
        status: 401,
        message: 'User not exists',
      });
    }
  }
}

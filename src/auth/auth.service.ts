import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLogin, UserRegister } from 'src/models/User';
import { PrismaService } from 'src/prisma.service';
import { comparePassword } from 'src/utils/bcrypt';
import { JWTConfig } from 'src/utils/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JWTConfig,
  ) {}

  async register(user: UserRegister) {
    try {
      const r = await this.prisma.user.create({ data: user });
      return {
        message: 'User created successfully',
        data: r,
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'Error creating user',
        error: error.meta,
      });
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

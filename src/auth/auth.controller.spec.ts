import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JWTConfig } from '../utils/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcryptUtils from '../utils/bcrypt';
import { Role } from '@prisma/client';

describe('Auth Module', () => {
  let authService: AuthService;
  let authController: AuthController;

  // Mocks
  const prismaMock = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    profile: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const jwtServiceMock = {
    signAsync: jest.fn().mockResolvedValue('fake-jwt-token'),
  };

  const jwtConfigMock = {
    getConfig: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: JWTConfig, useValue: jwtConfigMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);

    jest.clearAllMocks();
  });

  // --- Tests for AuthService ---

  describe('AuthService', () => {
    describe('register', () => {
      it('should create a user successfully', async () => {
        const user = {
          email: 'test@example.com',
          password: 'hashed',
          name: 'Test',
          dni: '12345678',
          role: Role.CLIENTE,
        };
        (prismaMock.user.create as jest.Mock).mockResolvedValue(user);
        (prismaMock.profile.create as jest.Mock).mockResolvedValue({ id: 1 });

        const result = await authService.register(user);

        expect(prismaMock.user.create).toHaveBeenCalledWith({
          data: {
            email: 'test@example.com',
            password: 'hashed',
            role: Role.CLIENTE,
          },
        });

        expect(result).toEqual({
          status: 200,
          message: 'User created successfully',
        });
      });
    });
    describe('login', () => {
      it('should return token on successful login', async () => {
        const mockUser = {
          id: 1,
          email: 'test@example.com',
          password: 'hashedpass',
          name: 'Test',
          role: Role.CLIENTE,
        };
        (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        jest.spyOn(bcryptUtils, 'comparePassword').mockResolvedValue(true);

        const result = await authService.login({
          email: 'test@example.com',
          password: 'plainpass',
        });

        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
          where: { email: 'test@example.com' },
        });
        expect(result).toEqual({ token: 'fake-jwt-token' });
      });

      it('should throw UnauthorizedException if user not found', async () => {
        (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(
          authService.login({
            email: 'notfound@example.com',
            password: 'pass',
          }),
        ).rejects.toThrow(UnauthorizedException);
      });

      it('should throw UnauthorizedException if password incorrect', async () => {
        const mockUser = {
          id: 1,
          email: 'test@example.com',
          password: 'hashedpass',
          name: 'Test',
          role: Role.CLIENTE,
        };
        (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        jest.spyOn(bcryptUtils, 'comparePassword').mockResolvedValue(false);

        await expect(
          authService.login({
            email: 'test@example.com',
            password: 'wrongpass',
          }),
        ).rejects.toThrow(UnauthorizedException);
      });
    });
  });

  // --- Tests for AuthController ---
  describe('AuthController', () => {
    describe('register', () => {
      it('should hash password and call service.register', async () => {
        const now = new Date();

        const user = {
          name: 'Juan Pérez',
          email: 'juan.perez@example.com',
          dni: '12345678',
          password: 'contraseñaSegura',
        };

        jest.spyOn(bcryptUtils, 'genHash').mockResolvedValue('hashedPassword');
        jest.spyOn(authService, 'register').mockResolvedValue({
          status: 200,
          message: 'User created successfully',
        });

        const result = await authController.register(user);

        expect(bcryptUtils.genHash).toHaveBeenCalledWith('contraseñaSegura');
        expect(authService.register).toHaveBeenCalledWith({
          ...user,
          password: 'hashedPassword',
        });
        expect(result).toEqual({
          status: 200,
          message: 'User created successfully',
        });
      });
    });

    describe('login', () => {
      it('should call service.login and return result', async () => {
        const userLogin = { email: 'a@b.com', password: '1234' };
        jest.spyOn(authService, 'login').mockResolvedValue({
          token: 'fake-jwt-token',
        });

        const result = await authController.login(userLogin);

        expect(authService.login).toHaveBeenCalledWith(userLogin);
        expect(result).toEqual({ token: 'fake-jwt-token' });
      });
    });
  });
});

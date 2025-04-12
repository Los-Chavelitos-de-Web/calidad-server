import { Controller, Get, Headers, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';  // Asegúrate de importar el JwtService
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    @Get('getAll')
    async getAllUsers(@Headers('Authorization') headers: string) {
        if (!headers) {
            throw new UnauthorizedException({
                message: 'Token not found',
            });
        }

        const token = headers.replace('Bearer ', '');
        const decoded = this.jwtService.decode(token);

        if (!decoded || !decoded['role']) {
            throw new UnauthorizedException({
                message: 'Invalid token or role not found in token',
            });
        }

        const userRole = decoded['role'];
        const requiredRole = 'ADMIN';

        if (userRole !== requiredRole) {
            throw new ForbiddenException({
                message: 'You do not have permission to access this resource',
            });
        }

        return this.userService.getAllUsers();

    }
}
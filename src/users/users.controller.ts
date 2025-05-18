import { Controller, Get, Headers, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';  // Asegúrate de importar el JwtService
import { UsersService } from './users.service';

@ApiTags('Users') // Categoría para agrupar los endpoints relacionados con usuarios
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  @Get('getAll')
  @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Descripción breve del endpoint
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  }) // Documentación del encabezado Authorization
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente.' }) // Respuesta esperada
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' }) // Respuesta en caso de token inválido
  @ApiResponse({ status: 403, description: 'No tienes permiso para acceder a este recurso.' }) // Respuesta en caso de falta de permisos
  async getAllUsers(@Headers('Authorization') headers: string) {
    try {
      if (!headers) {
        throw new UnauthorizedException({
          message: 'Token not found',
        });
      }

      const token = headers.replace('Bearer ', '');

      const decoded = this.jwtService.verify(token);

      if (!decoded || !decoded['role']) {
        throw new UnauthorizedException({
          message: 'Invalid token or role not found in token',
        });
      }

      const userRole = decoded['role'];
      const requiredRole = 'GERENTE';

      if (userRole !== requiredRole) {
        throw new ForbiddenException({
          message: 'You do not have permission to access this resource',
        });
      }

      return this.userService.getAllUsers();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException({
          message: 'Invalid or expired token',
        });
      }
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new UnauthorizedException({
        message: 'You do not have permission to access this resource',
      });
    }
  }
}

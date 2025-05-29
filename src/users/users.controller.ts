import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth/auth.guard';

@ApiTags('Users') // Categoría para agrupar los endpoints relacionados con usuarios
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getAll')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Descripción breve del endpoint
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  }) // Documentación del encabezado Authorization
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' }) // Respuesta en caso de token inválido
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para acceder a este recurso.',
  }) // Respuesta en caso de falta de permisos
  async getAllUsers(@Headers('Authorization') headers: string) {
    try {
      return this.userService.getAllUsers();
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new UnauthorizedException({
        message: 'You do not have permission to access this resource',
      });
    }
  }
}

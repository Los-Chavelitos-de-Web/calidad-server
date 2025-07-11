import { Module } from '@nestjs/common';
import { LibroReclamacionesController } from './libro-reclamaciones.controller';
import { LibroReclamacionesService } from './libro-reclamaciones.service';
import { PrismaService } from '../../src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        expiresIn: configService.get('JWT_EXPIRES_IN') || '60s',
      }),
    }),
  ],
  controllers: [LibroReclamacionesController],
  providers: [LibroReclamacionesService, PrismaService],
})
export class LibroReclamacionesModule {}

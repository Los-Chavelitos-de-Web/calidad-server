import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importar ApiProperty

export class LibroReclamacionesBase {

  @ApiProperty({ description: 'Id de la reclamacion' })
  @IsNumber()
  @IsNotEmpty()
  id?: number = 0;

  @ApiProperty({ description: 'Id del usuario' })
  @IsNumber()
  @IsNotEmpty()
  userId?: number = 0;

  @ApiProperty({ description: 'Fecha de la reclamacion' })
  @IsString()
  @IsNotEmpty()
  createdAt?: string;

  @ApiProperty({ description: 'Titulo de la reclamacion' })
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @ApiProperty({ description: 'Descripcion de la reclamacion' })
  @IsString()
  @IsNotEmpty()
  description: string = '';
}

export class LibroReclamacionesCreate {

  @ApiProperty({ description: 'Id del usuario' })
  @IsNumber()
  @Min(1)
  userId: number = 0;

  @ApiProperty({ description: 'Titulo de la reclamacion' })
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @ApiProperty({ description: 'Descripcion de la reclamacion' })
  @IsString()
  @IsNotEmpty()
  description: string = '';
}

export class LibroReclamacionesUpdate {

  @ApiProperty({ description: 'Id del usuario' })
  @IsNumber()
  @IsNotEmpty()
  userId: number = 0;

  @ApiProperty({ description: 'Titulo de la reclamacion' })
  @IsString()
  @IsNotEmpty()
  title: string = '';

  @ApiProperty({ description: 'Descripcion de la reclamacion' })
  @IsString()
  @IsNotEmpty()
  description: string = '';
}
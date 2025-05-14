import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from '@prisma/client';
export class UserRegister {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string = '';

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  dni: string = '';

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  email: string = '';

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string = '';

  role?: Role;
}

export class UserLogin {
  @IsString()
  @IsNotEmpty()
  email: string = '';

  @IsString()
  @IsNotEmpty()
  password: string = '';
}

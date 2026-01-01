import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class SignUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

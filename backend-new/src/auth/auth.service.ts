import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, SignUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async checkDuplicates(dto: CreateUserDto): Promise<void> {
    const [emailExists, usernameExists] = await Promise.all([
      this.userService.findByEmail(dto.email),
      this.userService.findByUsername(dto.username),
    ]);

    if (emailExists) {
      throw new ConflictException('Email already registered');
    }

    if (usernameExists) {
      throw new ConflictException('Username already taken');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async registerUser(dto: CreateUserDto) {
    try {
      await this.checkDuplicates(dto);

      const hashedPassword = await this.hashPassword(dto.password.trim());
      const userDto = { ...dto, password: hashedPassword };

      return this.userService.create(userDto);
    } catch (error) {
      throw error;
    }
  }

  async signIn(dto: SignUserDto) {
    try {
      const user = await this.userService.findByEmailWithPassword(dto.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        dto.password.trim(),
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = await this.generateToken(user._id.toString());

      return {
        message: 'User signed in successfully',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async generateToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { sub: userId },
      { expiresIn: '5h' },
    );

    console.log('[UsersService] generateToken() -> token generated');
    console.log('Token:', token);
    return token;
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);

      console.log('[UsersService] verifyToken() -> token is valid');
      return true;
    } catch {
      console.warn('[UsersService] verifyToken() -> token is invalid');
      return false;
    }
  }
}

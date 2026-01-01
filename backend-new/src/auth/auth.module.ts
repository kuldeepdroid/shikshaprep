import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './guards/jwt-guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [UsersModule],
  exports: [AuthService],
})
export class AuthModule {}

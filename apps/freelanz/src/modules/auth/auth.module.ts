import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AUTH_CONFIG } from './auth-client.config';
@Module({
  imports: [ClientsModule.register([AUTH_CONFIG])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}

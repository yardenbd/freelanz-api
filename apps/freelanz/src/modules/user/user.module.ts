import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { USER_CONFIG } from './user-client.config';
import { AUTH_CONFIG } from '../auth/auth-client.config';
@Module({
  imports: [
    ClientsModule.register([USER_CONFIG]),
    ClientsModule.register([AUTH_CONFIG]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, AuthService],
})
export class UserModule {}

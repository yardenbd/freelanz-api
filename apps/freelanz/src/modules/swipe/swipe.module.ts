import { Module } from '@nestjs/common';
import { SwipeController } from './swipe.controller';
import { SwipeService } from './swipe.service';
import { ClientsModule } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AUTH_CONFIG } from '../auth/auth-client.config';
import { SWIPE_CONFIG } from './swipe-client.config';
@Module({
  imports: [
    ClientsModule.register([SWIPE_CONFIG]),
    ClientsModule.register([AUTH_CONFIG]),
  ],
  controllers: [SwipeController],
  providers: [SwipeService, JwtService, AuthService],
})
export class SwipeModule {}

import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AppleSsoDTO,
  CreateUserGoogleDTO,
} from '@libs/dto/user/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { status } from '@grpc/grpc-js';
import { Util } from '@libs/util/util';
import { TwilioService } from './twilio/twilio.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twilioService: TwilioService,
  ) {}

  @GrpcMethod('AuthService', 'googleSignIn')
  async googleSignIn(data: CreateUserGoogleDTO) {
    try {
      const user = await this.authService.googleSignIn(data);
      if (!user) {
        const errorData = {
          code: status.UNAUTHENTICATED,
          message: 'Unable to create user',
        };
        throw Util.buildCustomError(errorData);
      }
      return user;
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }
  @GrpcMethod('AuthService', 'refreshToken')
  async refreshToken(data: { refreshToken: string }) {
    try {
      const payload = this.authService.validateRefreshToken(
        data.refreshToken,
      ) as jwt.JwtPayload & { email: string; userId: number };
      if (!payload) {
        const errorData = {
          code: status.UNAUTHENTICATED,
          message: 'Invalid refresh token',
        };
        throw Util.buildCustomError(errorData);
      }
      const newAccessToken = this.authService.generateAccessToken({
        userId: payload.userId,
        email: payload.email,
      });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }

  @GrpcMethod('AuthService', 'sendOtp')
  async sendOtp(data: { phoneNumber: string }) {
    return await this.twilioService.sendOtp(data.phoneNumber);
  }

  @GrpcMethod('AuthService', 'validateOtp')
  async validateOtp(data: { phoneNumber: string; code: string }) {
    return await this.twilioService.verifyOtp(data.phoneNumber, data.code);
  }

  @GrpcMethod('AuthService', 'appleSignIn')
  async appleSignIn(data: AppleSsoDTO) {
    return this.authService.appleSignIn(data);
  }

  @GrpcMethod('AuthService', 'loadUser')
  async loadUser(data: { userId: number }) {
    return this.authService.loadUser(data.userId);
  }
}

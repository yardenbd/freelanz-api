import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import {
  AppleSsoDTO,
  CreateUserGoogleDTO,
} from '@libs/dto/user/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { User } from '../../../../../libs/database/src/models/user.model';

interface AuthServiceGrpc {
  googleSignIn(
    data: CreateUserGoogleDTO,
  ): Observable<{ id: number; email: string }>;
  appleSignIn(data: AppleSsoDTO): Observable<{ id: number; email: string }>;
  loadUser(data: { userId: number }): Observable<User>;
  login(data: {
    email: string;
    fullName: string;
  }): Observable<{ token: string }>;
  refreshToken(data: {
    refreshToken: string;
  }): Observable<{ accessToken: string }>;
  sendOtp(data: { phoneNumber: string }): Observable<{ message: string }>;
  validateOtp(data: {
    phoneNumber: string;
    code: string;
  }): Observable<{ message: string }>;
}

@Injectable()
export class AuthService {
  private authServiceGrpc: AuthServiceGrpc;

  constructor(
    @Inject('AUTH_PACKAGE') private readonly client: ClientGrpc,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.authServiceGrpc =
      this.client.getService<AuthServiceGrpc>('AuthService');
  }

  googleSignIn(userData: CreateUserGoogleDTO) {
    return this.authServiceGrpc.googleSignIn(userData);
  }

  getNewAcsessToken(refreshToken: string) {
    return this.authServiceGrpc.refreshToken({ refreshToken });
  }

  validateWsToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      return payload;
    } catch (error) {
      throw new WsException('Invalid or expired token');
    }
  }

  appleSignIn(credentials: AppleSsoDTO) {
    return this.authServiceGrpc.appleSignIn(credentials);
  }

  sendOtp(phoneNumber: string) {
    return this.authServiceGrpc.sendOtp({ phoneNumber });
  }

  validateOtp(phoneNumber: string, code: string) {
    return this.authServiceGrpc.validateOtp({ phoneNumber, code });
  }

  loadUser(userId: number) {
    return this.authServiceGrpc.loadUser({ userId });
  }
}

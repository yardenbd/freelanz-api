import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  Req,
  ForbiddenException,
  UseFilters,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AppleSsoDTO,
  CreateUserGoogleDTO,
} from '@libs/dto/user/create-user.dto';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { Request } from 'express';
import { GrpcExceptionFilter } from '../../grpc-error-handler';
import { ValidateOtpDTO } from '../../../../../libs/dto/auth/validate-otp.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseFilters(new GrpcExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/load-user')
  async loadUser(@Req() req: Request) {
    console.log(req.user.userId);
    return firstValueFrom(this.authService.loadUser(req.user.userId));
  }

  @Post('register-google')
  async googleSso(@Body() body: CreateUserGoogleDTO) {
    try {
      return this.authService.googleSignIn(body).pipe(
        catchError((error) => {
          return throwError(() => new InternalServerErrorException(error));
        }),
      );
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }

  @Post('apple')
  async appleSso(@Body() body: AppleSsoDTO) {
    return await firstValueFrom(this.authService.appleSignIn(body));
  }

  @Post('refresh-token')
  async checkRefreshToken(@Req() req: Request) {
    const refreshToken = req.headers['x-refresh-token'];
    if (!refreshToken)
      return new ForbiddenException('Refresh Token is invlalid or expired');

    return await firstValueFrom(
      this.authService.getNewAcsessToken(refreshToken as string),
    );
  }

  @Post('/send-otp')
  async sendOtp(@Body() body: { phoneNum: string }) {
    return await firstValueFrom(this.authService.sendOtp(body.phoneNum));
  }

  @Post('/validate-otp')
  async validateOtp(@Body() body: ValidateOtpDTO) {
    return await firstValueFrom(
      this.authService.validateOtp(body.phoneNum, body.code),
    );
  }
}

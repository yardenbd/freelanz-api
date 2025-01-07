import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from '@libs/dto/user/update-user.dto';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { GrpcExceptionFilter } from '../../grpc-error-handler';

@Controller('user')
@UseGuards(JwtAuthGuard)
@UseFilters(GrpcExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/skills')
  async getSkills(@Query() query: { lang: string }) {
    return this.userService.getSkills(query.lang);
  }

  @Get('/strengths')
  async getStrengths(@Query() query: { lang: string }) {
    return this.userService.getStrengths(query.lang);
  }

  convertPartsToArray(formData) {
    const obj: any = {};
    if (formData && formData._parts) {
      formData._parts.forEach(([key, value]) => {
        obj[key] = value;
      });
    }
    return obj;
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Body() reqBody: { data: UpdateUserDTO },
  ) {
    const data = this.convertPartsToArray(reqBody.data);
    const fixedData = {
      strengths: data.strengths || [],
      skills: data.skills || [],
      file: file || '',
      userId: req.user.userId,
      email: data.email || '',
      name: data.name || '',
      gender: data.gender || '',
      dateOfBirth: data.dateOfBirth || '',
      type: data.type || '',
    };
    return firstValueFrom(this.userService.updateUser(fixedData));
  }
}

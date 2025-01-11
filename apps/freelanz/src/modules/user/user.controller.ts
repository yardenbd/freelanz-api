import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from '@libs/dto/user/update-user.dto';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { GrpcExceptionFilter } from '../../grpc-error-handler';
import { SetMetadata } from '@nestjs/common';

// Define the key for the metadata
export const IS_PUBLIC_KEY = 'isPublic';

// Create the decorator
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@Controller('user')
@UseGuards(JwtAuthGuard)
@UseFilters(GrpcExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/skills')
  @Public()
  async getSkills(@Query() query: { lang: string }) {
    if (!query.lang) throw new BadRequestException('Language not provided');
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
    @Body() reqBody: UpdateUserDTO,
  ) {
    const fixedData = {
      strengths: reqBody.strengths,
      skills: reqBody.skills,
      file: file,
      userId: req.user.userId,
      email: reqBody.email,
      name: reqBody.name,
      gender: reqBody.gender,
      dateOfBirth: reqBody.dateOfBirth,
      type: reqBody.type,
    };
    return firstValueFrom(this.userService.updateUser(fixedData));
  }

  @Patch('/documents')
  @UseInterceptors(FilesInterceptor('files'))
  async updateDocuments(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    console.log(files);
    // const fixedData = {
    //   strengths: reqBody.strengths,
    //   skills: reqBody.skills,
    //   file: file,
    //   userId: req.user.userId,
    //   email: reqBody.email,
    //   name: reqBody.name,
    //   gender: reqBody.gender,
    //   dateOfBirth: reqBody.dateOfBirth,
    //   type: reqBody.type,
    // };
    // return firstValueFrom(this.userService.updateUser(fixedData));
  }
}

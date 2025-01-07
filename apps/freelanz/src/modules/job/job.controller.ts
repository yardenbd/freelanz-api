import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { CreateJobDTO } from '@libs/dto/job/create-job.dto';
import { UpdateJobDTO } from '@libs/dto/job/update-job.dto';
import { firstValueFrom } from 'rxjs';
import { GrpcExceptionFilter } from '../../grpc-error-handler';
import { CreateCompletedJobDTO } from '@libs/dto/completed-job/create-completed-job.dto';

@Controller('job')
@UseGuards(JwtAuthGuard)
@UseFilters(new GrpcExceptionFilter())
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async createJob(@Req() req: Request, @Body() reqBody: CreateJobDTO) {
    return firstValueFrom(
      this.jobService.createJob({
        userId: req.user.userId,
        ...reqBody,
      }),
    );
  }

  @Post('/bulk')
  async createJobs(@Req() req: Request, @Body() reqBody: CreateJobDTO[]) {
    return this.jobService.createJobBulk(reqBody);
  }

  @Patch()
  async updateJob(@Req() req: Request, @Body() reqBody: UpdateJobDTO) {
    return await firstValueFrom(this.jobService.updateJob(reqBody));
  }

  @Get()
  async getJobList(@Req() req: Request) {
    return await firstValueFrom(
      this.jobService.getJobList({ userId: req.user.userId }),
    );
  }

  @Get('/completed-jobs')
  async getCompletedJobsHistory(@Req() req: Request) {
    return await firstValueFrom(
      this.jobService.getCompletedJobHistory({ userId: req.user.userId }),
    );
  }

  @Post('/completed-job')
  async createCompleteJob(
    @Req() req: Request,
    @Body() reqBody: CreateCompletedJobDTO,
  ) {
    return await firstValueFrom(this.jobService.createCompletedJob(reqBody));
  }

  @Get('/get-candidates/:jobId')
  async getUserApplications(@Param() params: { jobId: number }) {
    console.log(params.jobId);
    return await firstValueFrom(
      this.jobService.getCandidates({ jobId: params.jobId }),
    );
  }
}

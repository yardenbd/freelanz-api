import { Controller } from '@nestjs/common';
import { JobService } from './job.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateJobDTO } from '@libs/dto/job/create-job.dto';
import { UpdateJobDTO } from '@libs/dto/job/update-job.dto';
import { status } from '@grpc/grpc-js';
import { CreateCompletedJobDTO } from '@libs/dto/completed-job/create-completed-job.dto';
import { Util } from '@libs/util/util';

@Controller()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @GrpcMethod('JobService', 'createJob')
  async createJob(data: CreateJobDTO) {
    try {
      const created = await this.jobService.createJob(data);
      if (!created) {
        const errorData = {
          code: status.NOT_FOUND,
          message: 'Job not found',
        };
        throw Util.buildCustomError(errorData);
      }
      return {
        jobId: created.id,
        jobDescription: created.description,
        jobTitle: created.title,
        address: created.address,
        toolsRequired: created.tools_required,
        employeeAmount: created.employee_amount,
        payment: created.payment,
        additionalInstructions: created.instructions,
        startDate: created.date_start,
        endDate: created.date_end,
        status: created.status,
        latitude: created.latitude,
        longtitue: created.longitude,
      };
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }

  @GrpcMethod('JobService', 'createJobBulk')
  async createJobBulk(data: { jobs: CreateJobDTO[] }) {
    console.log('data in bulk', data);
    try {
      await Promise.all(
        data.jobs.map(async (job) => {
          await this.jobService.createJob(job);
        }),
      );
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }

  @GrpcMethod('JobService', 'updateJob')
  async updateJob(data: UpdateJobDTO) {
    try {
      const created = await this.jobService.updateJob(data);
      if (!created) {
        const errorData = {
          code: status.NOT_FOUND,
          message: 'Job not found',
        };
        throw Util.buildCustomError(errorData);
      }
      return {
        jobId: created.id,
        jobDescription: created.description,
        jobTitle: created.title,
        address: created.address,
        toolsRequired: created.tools_required,
        employeeAmount: created.employee_amount,
        payment: created.payment,
        additionalInstructions: created.instructions,
        startDate: created.date_start,
        endDate: created.date_end,
        status: created.status,
      };
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }

  @GrpcMethod('JobService', 'getCandidates')
  async getCandidates(data: { jobId: number }) {
    try {
      const resp = await this.jobService.getCandidates(data.jobId);
      if (!resp.length) {
        const errorData = {
          code: status.NOT_FOUND,
          message: 'Job has no candidates',
        };
        throw Util.buildCustomError(errorData);
      }
      return { jobs: resp };
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }

  @GrpcMethod('JobService', 'getCompletedJobHistory')
  async getCompletedJobHistory(data: { userId: number }) {
    try {
      const jobs = await this.jobService.getCompletedJobHistory(data.userId);
      if (!jobs || !jobs.length) {
        const errorData = {
          code: status.NOT_FOUND,
          message: 'User has no completed job',
        };
        throw Util.buildCustomError(errorData);
      }
      return jobs;
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }

  @GrpcMethod('JobService', 'createCompletedJob')
  async createCompletedJob(data: CreateCompletedJobDTO) {
    try {
      const job = await this.jobService.createCompletedJob(data);
      if (!job) {
        const errorData = {
          code: status.INTERNAL,
          message: 'Unable to complete job',
        };
        throw Util.buildCustomError(errorData);
      }
      return job;
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }
}

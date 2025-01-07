import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateJobDTO } from '@libs/dto/job/create-job.dto';
import { UpdateJobDTO } from '@libs/dto/job/update-job.dto';
import { Job } from '@libs/database/models/job.model';
import { CompletedJob } from '@libs/database/models/comleted-job.model';
import { CreateCompletedJobDTO } from '@libs/dto/completed-job/create-completed-job.dto';

interface JobServiceGrpc {
  createJob(data: CreateJobDTO): Observable<Job>;
  updateJob(data: UpdateJobDTO): Observable<Job>;
  getJobList(data: { userId: number }): Observable<Job[]>;
  createJobBulk(data: { jobs: CreateJobDTO[] }): Observable<Job[]>;
  getCompletedJobHistory(data: { userId: number }): Observable<CompletedJob[]>;
  createCompletedJob(data: CreateCompletedJobDTO): Observable<CompletedJob[]>;
  getCandidates(data: { jobId: number }): Observable<CompletedJob[]>;
}

@Injectable()
export class JobService {
  private jobServiceGrpc: JobServiceGrpc;

  constructor(@Inject('JOB_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.jobServiceGrpc = this.client.getService<JobServiceGrpc>('JobService');
  }

  updateJob(data: UpdateJobDTO) {
    return this.jobServiceGrpc.updateJob(data);
  }

  createJob(data: CreateJobDTO) {
    return this.jobServiceGrpc.createJob(data);
  }

  createJobBulk(data: CreateJobDTO[]) {
    return this.jobServiceGrpc.createJobBulk({ jobs: data });
  }

  getJobList(data: { userId: number }): Observable<Job[]> {
    return this.jobServiceGrpc.getJobList(data);
  }

  getCompletedJobHistory(data: { userId: number }): Observable<CompletedJob[]> {
    return this.jobServiceGrpc.getCompletedJobHistory(data);
  }

  createCompletedJob(data: CreateCompletedJobDTO): Observable<CompletedJob[]> {
    return this.jobServiceGrpc.createCompletedJob(data);
  }

  getCandidates(data: { jobId: number }) {
    return this.jobServiceGrpc.getCandidates(data);
  }
}

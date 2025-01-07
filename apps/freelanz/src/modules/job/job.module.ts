import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { ClientsModule } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JOB_CONFIG } from './job-client.config';
import { AUTH_CONFIG } from '../auth/auth-client.config';
@Module({
  imports: [
    ClientsModule.register([JOB_CONFIG]),
    ClientsModule.register([AUTH_CONFIG]),
  ],
  controllers: [JobController],
  providers: [JobService, JwtService, AuthService],
})
export class JobModule {}

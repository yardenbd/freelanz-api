import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCompletedJobDTO {
  @IsNumber()
  @IsNotEmpty()
  emplyeeId: number;

  @IsNumber()
  @IsNotEmpty()
  businessId: number;

  @IsNumber()
  @IsNotEmpty()
  jobId: number;
}

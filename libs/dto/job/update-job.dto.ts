import {
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class UpdateJobDTO {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @IsString()
  @IsOptional()
  jobTitle: string;

  @IsString()
  @IsOptional()
  jobDescription: string;

  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  @IsOptional()
  toolsRequired: string;

  @IsNumber()
  @IsOptional()
  employeeAmount: number;

  @IsNumber()
  @IsOptional()
  payment: number;

  @IsString()
  @IsOptional()
  additionalInstructions: string;

  @IsArray()
  @IsNumber({}, { each: true })
  strengths: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  skills: number[];

  jobImages: Express.Multer.File[];

  @IsString()
  @IsOptional()
  startDate: string;

  @IsNumber()
  @IsOptional()
  userId: number;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  @IsOptional()
  longitude: number;

  @IsNumber()
  @IsOptional()
  latitude: number;
}

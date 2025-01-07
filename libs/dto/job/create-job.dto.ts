import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateJobDTO {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  toolsRequired: string;

  @IsNumber()
  @IsNotEmpty()
  employeeAmount: number;

  @IsNumber()
  @IsNotEmpty()
  payment: number;

  @IsString()
  @IsNotEmpty()
  additionalInstructions: string;

  @IsArray()
  @IsNumber({}, { each: true })
  strengths: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  skills: number[];

  jobImages: Express.Multer.File[];

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;
}

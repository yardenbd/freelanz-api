import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDTO {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  strengths?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  skills?: number[];

  @IsOptional()
  file?: any;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  gender?: 'male' | 'female';

  @IsOptional()
  @IsString()
  type?: 'Business' | 'Employee';

  @IsOptional()
  @IsString()
  dateOfBirth?: string;
}

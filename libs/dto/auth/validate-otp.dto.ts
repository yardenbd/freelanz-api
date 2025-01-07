import { IsString } from 'class-validator';

export class ValidateOtpDTO {
  @IsString()
  phoneNum: string;

  @IsString()
  code: string;
}

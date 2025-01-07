import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEmail,
  IsIn,
  IsArray,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateUserDTO {
  email: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  role: string;
}

export class CreateUserGoogleDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Employee', 'Business'])
  type: string;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;
}

class FullName {
  @IsOptional()
  @IsString()
  givenName?: string;

  @IsOptional()
  @IsString()
  namePrefix?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  nameSuffix?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  familyName?: string;
}

export class AppleSsoDTO {
  @IsString()
  user: string;

  @IsNumber()
  realUserStatus: number;

  @IsString()
  identityToken: string;

  @IsObject()
  fullName: FullName;

  @IsString()
  authorizationCode: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

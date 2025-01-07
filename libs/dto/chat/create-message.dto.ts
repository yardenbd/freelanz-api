import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDTO {
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}

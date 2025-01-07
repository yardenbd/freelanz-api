import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChatDTO {
  @IsNotEmpty()
  @IsNumber()
  participantId: number;
}

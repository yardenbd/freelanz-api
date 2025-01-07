import { IsString, IsNumber, IsNotEmpty, IsIn } from 'class-validator';

export class CreateSwipeDTO {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['left', 'right'])
  swipeType: 'left' | 'right';
}

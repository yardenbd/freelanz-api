import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { SwipeService } from './swipe.service';
import { CreateSwipeDTO } from '@libs/dto/swipes/create-swipe.dto';

@Controller('swipe')
@UseGuards(JwtAuthGuard)
export class SwipeController {
  constructor(private readonly swipeService: SwipeService) {}

  @Post()
  async createSwipe(@Req() req: Request, @Body() reqBody: CreateSwipeDTO) {
    try {
      await this.swipeService.createSwipe({
        jobId: reqBody.jobId,
        swipeType: reqBody.swipeType,
        userId: req.user.userId,
      });
      return 'Swipe created';
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }
}

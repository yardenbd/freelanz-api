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
import { CreateChatDTO } from '@libs/dto/chat/create-chat.dto';
import { ChatService } from './chat.service';
import { firstValueFrom } from 'rxjs';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Req() req: Request, @Body() reqBody: CreateChatDTO) {
    try {
      return await firstValueFrom(
        this.chatService.createChat({
          participantId: reqBody.participantId,
          chatCreatorId: req.user?.userId,
        }),
      );
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }
}

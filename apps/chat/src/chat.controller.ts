import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Util } from '@libs/util/util';
import { status } from '@grpc/grpc-js';
import { CreateMessageDTO } from '@libs/dto/chat/create-message.dto';
import {
  GrpcMethod,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { CreateChatDTO } from '@libs/dto/chat/create-chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  async getMessages(data: { chatId: string; userId: string }) {
    try {
      return {
        messages: await this.chatService.getMessages(data.chatId, data.userId),
      };
    } catch (err) {}
  }

  @GrpcMethod('ChatService', 'createChat')
  async createChat(data: CreateChatDTO & { chatCreatorId: number }) {
    try {
      const created = await this.chatService.createChat(data);
      if (!created) {
        const errorData = {
          code: status.INTERNAL,
          message: 'Unable to create chat',
        };
        throw Util.buildCustomError(errorData);
      }
      return { chatId: created.id };
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }

  @MessagePattern('chat-messages')
  async saveMessage(data: CreateMessageDTO) {
    try {
      const message = await this.chatService.saveMessage(data);
      if (!message) {
        const errorData = {
          code: status.INTERNAL,
          message: 'Unable to create message',
        };
        throw new RpcException(errorData);
      }
      this.chatService.publishMessage(data);
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }
}

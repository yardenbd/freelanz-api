import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateChatDTO } from '@libs/dto/chat/create-chat.dto';
import { Chat } from '@libs/database/models/chat.model';

interface IChatServiceGrpc {
  createChat(data: CreateChatDTO & { chatCreatorId: number }): Observable<Chat>;
}

@Injectable()
export class ChatService {
  private chatServiceGrpc: IChatServiceGrpc;

  constructor(@Inject('CHAT_PACKAGE') private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.chatServiceGrpc =
      this.client.getService<IChatServiceGrpc>('ChatService');
  }

  createChat(data: CreateChatDTO & { chatCreatorId: number }) {
    return this.chatServiceGrpc.createChat(data);
  }
}

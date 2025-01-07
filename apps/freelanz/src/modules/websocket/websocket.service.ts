import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateMessageDTO } from '@libs/dto/chat/create-message.dto';
import { KafkaProducerService } from '../../../../../libs/chat/kafka-producer.service';

interface ChatService {
  sendMessage(data: {
    senderId: number;
    receiverId: number;
    content: string;
  }): Observable<{ status: string }>;

  getMessages(data: {
    chatId: string;
    userId: string;
  }): Observable<{ messages: any[] }>;
}

@Injectable()
export class WebsocketService {
  private chatService: ChatService;

  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  async publishMessageToQueue(data: CreateMessageDTO) {
    try {
      this.kafkaProducerService.sendMessage('chat-messages', data);
    } catch (error) {
      console.error('Error while sending message to Kafka:', error.message);
      throw error;
    }
  }

  async getChatMessages(chatId: string, userId: string): Promise<any[]> {
    const response = await this.chatService
      .getMessages({ chatId, userId })
      .toPromise();
    return response.messages;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateMessageDTO } from '@libs/dto/chat/create-message.dto';
import { Message } from '@libs/database/models/message.model';
import { CreateChatDTO } from '@libs/dto/chat/create-chat.dto';
import { Chat } from '../../../libs/database/src/models/chat.model';
import { ChatParticipant } from '../../../libs/database/src/models/chat-participant.model';
import { KafkaProducerService } from '../../../libs/chat/kafka-producer.service';

@Injectable()
export class ChatService {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  async saveMessage(data: CreateMessageDTO) {
    console.log(data.receiverId);
    const message = Message.build();
    message.sender_id = data.senderId;
    message.receiver_id = data.receiverId;
    message.content = data.content;
    await message.save();
    return message;
  }

  async getMessages(chatId: string, userId: string) {}

  async publishMessage(data: CreateMessageDTO) {
    await this.kafkaProducerService.sendMessage('chat.message.received', data);
  }

  async createChat(data: CreateChatDTO & { chatCreatorId: number }) {
    console.log(data);
    const chat = Chat.build();
    await chat.save();
    const chatCreator = ChatParticipant.build();
    chatCreator.chat_id = chat.id;
    chatCreator.user_id = data.chatCreatorId;
    const chatParticipant = ChatParticipant.build();
    chatParticipant.chat_id = chat.id;
    chatParticipant.user_id = data.participantId;
    await Promise.all([chatParticipant.save(), chatCreator.save()]);
    return chat;
  }
}

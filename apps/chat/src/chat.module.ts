import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseModule } from '@libs/database';
import { RedisService } from '@libs/redis/redis.service';
import { KafkaModule } from '../../../libs/chat/kafka.module';

@Module({
  imports: [
    DatabaseModule,
    KafkaModule.register('api-gateway-client', 'chat-group'),
  ],
  controllers: [ChatController],
  providers: [ChatService, RedisService],
})
export class ChatModule {}

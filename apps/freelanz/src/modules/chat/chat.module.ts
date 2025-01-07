import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseModule } from '@libs/database';
import { RedisService } from '@libs/redis/redis.service';
import { ClientsModule } from '@nestjs/microservices';
import { CHAT_CONFIG } from '../websocket/chat-client.config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, ClientsModule.register([CHAT_CONFIG])],
  controllers: [ChatController],
  providers: [ChatService, RedisService, JwtService],
})
export class ChatModule {}

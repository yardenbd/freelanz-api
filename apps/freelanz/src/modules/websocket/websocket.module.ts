import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { ClientsModule } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AUTH_CONFIG } from '../auth/auth-client.config';
import { ConnectionService } from '../../services/connection.service';
import { RedisService } from '@libs/redis/redis.service';
import { KafkaModule } from '../../../../../libs/chat/kafka.module';
import { KafkaConsumerService } from './kafka-consumer.service';

@Module({
  imports: [
    ClientsModule.register([AUTH_CONFIG]),
    KafkaModule.register('api-gateway-client', 'chat-group'),
  ],
  providers: [
    WebsocketGateway,
    WebsocketService,
    JwtService,
    AuthService,
    ConnectionService,
    RedisService,
    KafkaConsumerService,
  ],
  exports: [WebsocketService],
})
export class WebsocketModule {}

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WebsocketService } from './websocket.service';
import { UseGuards } from '@nestjs/common';
import { JwtWsAuthGuard } from '../auth/jwt-auth-ws.guard';
import { AuthService } from '../auth/auth.service';
import { User } from '@libs/database/models/user.model';
import { UserConnection } from '@libs/database/models/user-connection.model';
import { CreateMessageDTO } from '@libs/dto/chat/create-message.dto';
import { ConnectionService } from '../../services/connection.service';

@UseGuards(JwtWsAuthGuard)
@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly websocketService: WebsocketService,
    private readonly authService: AuthService,
    private readonly connectionService: ConnectionService,
  ) {}

  async handleDeliveryNotification(data: CreateMessageDTO) {
    const connectionString = await this.connectionService.getWsConnectionString(
      data.receiverId,
    );
    console.log('connectionString', connectionString);
    if (connectionString) {
      console.log('EMITTING MESSAGE BACK');
      this.server.to(connectionString).emit('receiveMessage', {
        senderId: data.senderId,
        content: data.content,
      });
    } else {
      console.warn(`User ${data.receiverId} is not connected.`);
    }
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers['authorization']?.split(' ')[1];

      if (!token) {
        throw new WsException('Authorization token not provided');
      }

      const payload = this.authService.validateWsToken(token);
      const user = await User.findByPk(payload.userId);
      if (!user) {
        throw new WsException('User does not exist');
      }

      await this.connectionService.registerConnection(user.id, client.id);

      console.log(`User ${user.id} connected with socket ID ${client.id}`);
    } catch (error) {
      console.error('Connection refused:', error.message);
      client.emit('error', { message: error.message });
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const userConnection = await UserConnection.findOne({
        where: { ws_connection_string: client.id },
        include: [{ model: User, as: 'user' }],
      });
      if (!userConnection) throw new WsException('user has no connections');
      await this.connectionService.removeConnection(
        userConnection.user_id,
        userConnection,
      );
    } catch (error) {
      console.error('Disconnection error:', error.message);
    } finally {
      client.disconnect();
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    data: CreateMessageDTO,
  ) {
    try {
      this.websocketService.publishMessageToQueue(data);
    } catch (err) {
      this.server.emit('messageError', {
        status: 'error',
        message: err.message,
      });
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() data: { chatId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const messages = await this.websocketService.getChatMessages(
      data.chatId,
      data.userId,
    );
    client.emit('messageHistory', messages);
  }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtWsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token =
      client.handshake.headers['authorization']?.split(' ')[1] || // From headers
      client.handshake.auth?.token; // From handshake auth
    if (!token) {
      throw new WsException('Token not provided');
    }

    try {
      // Verify the token and attach user details to the client
      const payload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      client.handshake.auth = { user: payload }; // Attach the user to the handshake
      return true;
    } catch (err) {
      throw new WsException('Invalid token');
    }
  }
}

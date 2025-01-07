import { Injectable } from '@nestjs/common';
import { RedisService } from '@libs/redis/redis.service';
import { UserConnection } from '@libs/database/models/user-connection.model';

@Injectable()
export class ConnectionService {
  private readonly CONNECTION_SET_KEY = 'active_connections';
  private readonly redisTTL = 30 * 60; // 30 minutes in seconds

  constructor(private readonly redisService: RedisService) {}

  async registerConnection(
    userId: number,
    wsConnectionString: string,
  ): Promise<void> {
    const redisKey = `user:${userId}`;

    await this.redisService.set(redisKey, wsConnectionString, this.redisTTL);

    await UserConnection.upsert({
      user_id: userId,
      ws_connection_string: wsConnectionString,
    });

    console.log(`User ${userId} connection stored in Redis and MySQL.`);
  }

  async refreshConnection(userId: number): Promise<void> {
    const redisKey = `user:${userId}`;

    const exists = await this.redisService.get(redisKey);
    if (exists) {
      await this.redisService.expire(redisKey, this.redisTTL);
      console.log(`TTL refreshed for user ${userId}`);
    } else {
      console.warn(`User ${userId} not found in Redis. Cannot refresh TTL.`);
    }
  }

  async removeConnection(
    userId: number,
    userConnection: UserConnection,
  ): Promise<void> {
    const redisKey = `user:${userId}`;
    userConnection.ws_connection_string = null;
    await Promise.all([this.redisService.del(redisKey), userConnection.save()]);
  }

  async getWsConnectionString(userId: number): Promise<string | null> {
    const redisKey = `user:${userId}`;

    let wsConnectionString = await this.redisService.get(redisKey);

    if (!wsConnectionString) {
      console.log(
        `Connection for user ${userId} not found in Redis. Falling back to MySQL.`,
      );

      const userConnection = await UserConnection.findOne({
        where: { user_id: userId },
      });

      if (userConnection) {
        wsConnectionString = userConnection.ws_connection_string;

        await this.redisService.set(
          redisKey,
          wsConnectionString,
          this.redisTTL,
        );
        console.log(`Connection for user ${userId} restored in Redis.`);
      } else {
        console.warn(
          `Connection for user ${userId} not found in MySQL either.`,
        );
      }
    }

    return wsConnectionString;
  }
}

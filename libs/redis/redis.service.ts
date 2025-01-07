import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly redisClient: Redis;
  private readonly publisher: Redis;
  private readonly subscriber: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: '127.0.0.1',
      port: 6379,
    });
    this.publisher = new Redis({ host: 'localhost', port: 6379 }); // Update with your Redis host/port
    this.subscriber = new Redis({ host: 'localhost', port: 6379 });
  }

  async onModuleInit() {
    console.log('Connecting to Redis...');
    await this.redisClient.ping();
    console.log('Connected to Redis!');
  }

  async onModuleDestroy() {
    console.log('Closing Redis connection...');
    await this.redisClient.quit();
    await this.publisher.quit();
    await this.subscriber.quit();
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    if (ttlInSeconds) {
      await this.redisClient.set(key, value, 'EX', ttlInSeconds);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async expire(key: string, ttlInSeconds: number): Promise<void> {
    await this.redisClient.expire(key, ttlInSeconds);
  }

  publish(channel: string, message: string): void {
    this.publisher.publish(channel, message);
  }

  subscribe(channel: string, callback: (message: string) => void): void {
    this.subscriber.subscribe(channel, (err) => {
      if (err) {
        console.error(
          `Failed to subscribe to channel ${channel}:`,
          err.message,
        );
      }
    });

    this.subscriber.on('message', (receivedChannel, message) => {
      if (receivedChannel === channel) {
        callback(message);
      }
    });
  }
}

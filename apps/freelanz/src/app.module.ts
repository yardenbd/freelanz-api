import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { DatabaseModule } from '@libs/database';
import { UserModule } from './modules/user/user.module';
import { JobModule } from './modules/job/job.module';
import { SwipeModule } from './modules/swipe/swipe.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { CleanupService } from './services/cleanup.service';
import { ChatModule } from './modules/chat/chat.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    NestjsFormDataModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../../../.env'),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    DatabaseModule,
    UserModule,
    JobModule,
    // SwipeModule,
    // WebsocketModule,
    ChatModule,
  ],
  providers: [JwtStrategy, CleanupService],
})
export class AppModule {}

import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Message } from './message.model';
import { ChatParticipant } from './chat-participant.model';

@Table({
  tableName: 'chat',

  indexes: [
    {
      name: 'idx_chat_created_at',
      fields: ['created_at'],
    },
    {
      name: 'idx_chat_updated_at',
      fields: ['updated_at'],
    },
  ],
})
export class Chat extends Model {
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @BelongsToMany(() => User, () => ChatParticipant)
  participants: User[];
}

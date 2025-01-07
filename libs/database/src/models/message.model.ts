import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Chat } from './chat.model';

@Table({
  tableName: 'message',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_message_receiver_sender',
      fields: ['receiver_id', 'sender_id'],
    },
    {
      name: 'idx_message_created_at',
      fields: ['created_at'],
    },
    {
      name: 'idx_message_updated_at',
      fields: ['updated_at'],
    },
  ],
})
export class Message extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_read: boolean;

  @BelongsTo(() => User, { foreignKey: 'sender_id', as: 'sender' })
  sender: User;
  sender_id: number;

  @BelongsTo(() => User, { foreignKey: 'receiver_id', as: 'reciver' })
  reciver: User;
  receiver_id: number;

  @BelongsTo(() => Chat, { foreignKey: 'chat_id', as: 'chat' })
  chat: Chat;
  chat_id: number;
}

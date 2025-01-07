import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Chat } from './chat.model';
import { User } from './user.model';

@Table({
  tableName: 'chat_participant',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_chat_user',
      fields: ['chat_id', 'user_id'],
      unique: true,
    },
    {
      name: 'idx_user_chat',
      fields: ['user_id', 'chat_id'],
    },
  ],
})
export class ChatParticipant extends Model {
  @ForeignKey(() => Chat)
  @Column
  chat_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  joined_at: Date;
}

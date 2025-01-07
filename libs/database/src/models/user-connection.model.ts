import {
  BelongsTo,
  Column,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './user.model';

@Table({
  tableName: 'user_connection',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_ws_connection_string',
      fields: ['ws_connection_string'],
    },
    {
      name: 'unique_user_id',
      unique: true,
      fields: ['user_id'],
    },
  ],
})
export class UserConnection extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;

  @Index('idx_ws_connection_string')
  @Column({
    type: DataTypes.STRING(128),
    allowNull: true,
  })
  public ws_connection_string: string;
}

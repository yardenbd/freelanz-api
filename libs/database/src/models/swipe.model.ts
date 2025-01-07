import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Job } from './job.model';

@Table({
  tableName: 'swipe',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_swipe_user_job',
      fields: ['user_id', 'job_id'],
    },
    {
      name: 'idx_swipe_type_job',
      fields: ['swipe_type', 'job_id'],
    },
  ],
})
export class Swipe extends Model<Swipe> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Job)
  @Column({ type: DataType.INTEGER, allowNull: false })
  job_id: number;

  @Column({ type: DataType.ENUM('left', 'right'), allowNull: false })
  swipe_type: 'left' | 'right';

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  created_at: Date;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;

  @BelongsTo(() => Job, { foreignKey: 'job_id', as: 'job' })
  job: Job;
}

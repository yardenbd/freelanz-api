import { BelongsTo, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Job } from './job.model';

@Table({
  tableName: 'completed_job',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_employee_business',
      fields: ['employee_id', 'business_id'],
    },
    {
      name: 'idx_job_id',
      fields: ['job_id'],
    },
  ],
})
export class CompletedJob extends Model {
  @BelongsTo(() => User, { foreignKey: 'employee_id', as: 'employee' })
  employee: User;
  employee_id: number;

  @BelongsTo(() => User, { foreignKey: 'business_id', as: 'business' })
  business: User;
  business_id: number;

  @BelongsTo(() => Job, { foreignKey: 'job_id', as: 'job' })
  job: Job;
  job_id: number;
}

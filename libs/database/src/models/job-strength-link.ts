import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Job } from './job.model';
import { Strength } from './strength.model';

@Table({
  tableName: 'job_strength_link',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_job_strength',
      fields: ['job_id', 'strength_id'], // Composite index for job-strength lookup
    },
  ],
})
export class JobStrengthlLink extends Model {
  @ForeignKey(() => Job)
  @Column
  job_id: number;

  @ForeignKey(() => Strength)
  @Column
  strength_id: number;

  @BelongsTo(() => Job)
  job: Job;

  @BelongsTo(() => Strength)
  strength: Strength;
}
// setTimeout(() => {
//   MinifigPartLink.sync({ force: false });
//   console.log('PartColorLink model created');
// }, 3000);

import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Skill } from './skill.model';
import { Job } from './job.model';

@Table({
  tableName: 'job_skill_link',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_job_skill',
      fields: ['job_id', 'skill_id'],
    },
  ],
})
export class JobSkillLink extends Model {
  @ForeignKey(() => Job)
  @Column
  job_id: number;

  @ForeignKey(() => Skill)
  @Column
  skill_id: number;

  @BelongsTo(() => Job)
  job: Job;

  @BelongsTo(() => Skill)
  skill: Skill;
}
// setTimeout(() => {
//   MinifigPartLink.sync({ force: false });
//   console.log('PartColorLink model created');
// }, 3000);

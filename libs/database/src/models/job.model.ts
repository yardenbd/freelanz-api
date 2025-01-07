import {
  BelongsTo,
  BelongsToMany,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Skill } from './skill.model';
import { Strength } from './strength.model';
import { JobSkillLink } from './job-skill-link';
import { JobStrengthlLink } from './job-strength-link';
import { User } from './user.model';

@Table({
  tableName: 'job',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_job_status_lat_lon',
      fields: ['status', 'latitude', 'longitude'],
    },
    {
      name: 'idx_job_lat_lon',
      fields: ['latitude', 'longitude'],
    },
  ],
})
export class Job extends Model {
  @Column({
    type: DataType.STRING(128),
  })
  public title: string;

  @Column({
    type: DataType.TEXT,
  })
  public tools_required: string;
  @Column({
    type: DataType.TEXT,
  })
  public instructions: string;

  @Column({
    type: DataType.TEXT,
  })
  public description: string;

  @Column({
    type: DataType.INTEGER,
  })
  public employee_amount: number;

  @Column({
    type: DataType.INTEGER,
  })
  public payment: number;

  @Column({
    type: DataType.FLOAT,
  })
  public longitude: number;

  @Column({
    type: DataType.FLOAT,
  })
  public latitude: number;

  @Column({
    type: DataType.STRING(256),
  })
  public address: string;

  @Column({
    type: DataType.STRING(32),
  })
  public status: string;

  @Column({
    type: DataType.STRING(64),
  })
  public date_start: string;

  @Column({
    type: DataType.STRING(64),
  })
  public date_end: string;

  @BelongsToMany(() => Skill, () => JobSkillLink)
  public skills: Skill[];

  @BelongsToMany(() => Strength, () => JobStrengthlLink)
  public strength: Strength[];

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;
  user_id: number;
}
// setTimeout(() => {
//   Skill.sync({ force: false });

// }, 3000);

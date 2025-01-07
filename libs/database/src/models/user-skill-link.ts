import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Skill } from './skill.model';

@Table({
  tableName: 'user_skill_link',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_user_skill',
      fields: ['user_id', 'skill_id'], // Composite index for user-skill lookup
    },
  ],
})
export class UserSkillLink extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Skill)
  @Column
  skill_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Skill)
  skill: Skill;
}
// setTimeout(() => {
//   MinifigPartLink.sync({ force: false });
//   console.log('PartColorLink model created');
// }, 3000);

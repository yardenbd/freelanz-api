import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Strength } from './strength.model';

@Table({
  tableName: 'user_strength_link',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      name: 'idx_user_strength',
      fields: ['user_id', 'strength_id'], // Composite index for user-strength lookup
    },
  ],
})
export class UserStrengthlLink extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Strength)
  @Column
  strength_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Strength)
  strength: Strength;
}
// setTimeout(() => {
//   MinifigPartLink.sync({ force: false });
//   console.log('PartColorLink model created');
// }, 3000);

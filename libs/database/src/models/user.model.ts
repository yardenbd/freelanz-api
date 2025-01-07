import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Skill } from './skill.model';
import { UserSkillLink } from './user-skill-link';
import { Strength } from './strength.model';
import { UserStrengthlLink } from './user-strength-link';
// import { compareSync, hashSync } from "bcryptjs";
// import Util from "../util";

@Table({
  tableName: 'user',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model {
  @Column({
    type: new DataTypes.STRING(64),
  })
  public name: string;

  @Column({
    type: new DataTypes.STRING(256),
  })
  public address: string;

  @Column({
    type: new DataTypes.STRING(128),
    validate: {
      isEmail: true,
    },
  })
  public email: string;

  @Column({ type: DataTypes.FLOAT })
  public latitude: number;

  @Column({ type: DataTypes.FLOAT })
  public longitude: number;

  @Column({ type: DataTypes.STRING(32) })
  public phone_number: string;

  @Column({ type: DataTypes.STRING(32) })
  public date_of_birth: string;

  @Column({ type: DataTypes.STRING(32) })
  public role: string;

  @Column({ type: DataTypes.BOOLEAN })
  public is_phone_verified: boolean;

  @Column({ type: DataTypes.ENUM('Employee', 'Business') })
  public type: 'Employee' | 'Business';

  @Column({ type: DataTypes.ENUM('male', 'female') })
  public gender: 'male' | 'female';

  @Column({ type: DataTypes.STRING })
  public business_number: string;

  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  @BelongsToMany(() => Skill, () => UserSkillLink)
  public skills: Skill[];

  @BelongsToMany(() => Strength, () => UserStrengthlLink)
  public strengths: Strength[];
}
// setTimeout(() => {
//   User.sync({ force: false });
//   console.log('User model created');
// }, 3000);

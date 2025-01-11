import { Injectable } from '@nestjs/common';
import { CreateUserGoogleDTO } from '@libs/dto/user/create-user.dto';
import { User } from '@libs/database/models/user.model';
import { UpdateUserDTO } from '@libs/dto/user/update-user.dto';
import { UserSkillLink } from '../../../libs/database/src/models/user-skill-link';
import { Op } from 'sequelize';
import { UserStrengthlLink } from '../../../libs/database/src/models/user-strength-link';

@Injectable()
export class UserService {
  async googleSignIn(credentials: CreateUserGoogleDTO) {
    const {
      displayName,
      email,
      phoneNumber,
      type,
      latitude,
      longitude,
      address,
    } = credentials;

    const [user, exist] = await User.findOrCreate({
      where: {
        email: credentials.email,
      },
      defaults: {
        full_name: displayName,
        email: email,
        phone_number: phoneNumber,
        type,
        latitude,
        longitude,
        address,
      },
    });
    return {};
  }
  async handleUserRelation(
    ids: number[],
    userId: number,
    relationTable,
    field: string,
  ) {
    const usl = await relationTable.findAll({
      where: {
        [field]: {
          [Op.in]: ids,
        },
        user_id: userId,
      },
    });
    const remoteIds = usl.map((record) => record[field]);
    const idsToInsert = ids.filter((id) => !remoteIds.includes(id));
    const recordsToInsert = idsToInsert.map((id) => {
      return { [field]: id, user_id: userId };
    });
    await relationTable.bulkCreate(recordsToInsert);
    await relationTable.destroy({
      where: {
        user_id: userId,
        [field]: {
          [Op.notIn]: ids,
        },
      },
    });
  }

  async updateUser(data: UpdateUserDTO & { userId: number }) {
    const user = await User.findByPk(data.userId);
    console.log(data);
    if (!user) return null;
    user.email = data.email || user.email;
    user.name = data.name || user.name;
    user.date_of_birth = data.dateOfBirth || user.date_of_birth;
    user.gender = data.gender || user.gender;
    user.type = data.type || user.type;
    await user.save();
    if (data.skills) {
      await this.handleUserRelation(
        data.skills,
        data.userId,
        UserSkillLink,
        'skill_id',
      );
    }
    if (data.strengths) {
      await this.handleUserRelation(
        data.strengths,
        data.userId,
        UserStrengthlLink,
        'strength_id',
      );
    }

    // if (data.file) {
    //   aw;
    // }
    return {
      id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      latitude: user.latitude,
      longitude: user.longitude,
      role: user.role,
      type: user.type,
      gender: user.gender,
      isPhoneVerified: user.is_phone_verified,
      businessNumber: user.business_number,
      phoneNumber: user.phone_number,
      dateOfBirth: user.date_of_birth,
    };
  }
}

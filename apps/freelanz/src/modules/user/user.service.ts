import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UpdateUserDTO } from '../../../../../libs/dto/user/update-user.dto';
import { Skill } from '../../../../../libs/database/src/models/skill.model';
import { Strength } from '../../../../../libs/database/src/models/strength.model';

interface UserServiceGrpc {
  updateUser(
    data: UpdateUserDTO & { userId: number },
  ): Observable<{ accessToken: string }>;
}

@Injectable()
export class UserService {
  private userServiceGrpc: UserServiceGrpc;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceGrpc =
      this.client.getService<UserServiceGrpc>('UserService');
  }

  updateUser(data: UpdateUserDTO & { userId: number }) {
    return this.userServiceGrpc.updateUser(data);
  }

  async getSkills(lang: string) {
    try {
      const skills = await Skill.findAll({ attributes: [lang, 'id'] });
      return skills;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getStrengths(lang: string) {
    try {
      const strengths = await Strength.findAll({
        attributes: [lang, 'id'],
      });
      return strengths;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}

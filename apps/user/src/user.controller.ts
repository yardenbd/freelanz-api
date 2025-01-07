import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserGoogleDTO } from '@libs/dto/user/create-user.dto';
import { UpdateUserDTO } from '@libs/dto/user/update-user.dto';
import { status } from '@grpc/grpc-js';
import { Util } from '@libs/util/util';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'googleSignIn')
  async googleSignIn(data: CreateUserGoogleDTO) {
    try {
      const user = await this.userService.googleSignIn(data);
      if (!user) {
        const errorData = {
          code: status.INTERNAL,
          message: 'Unable to create user',
        };
        throw Util.buildCustomError(errorData);
      }
      return user;
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }

  @GrpcMethod('UserService', 'updateUser')
  async updateUser(data: UpdateUserDTO & { userId: number }) {
    try {
      const user = await this.userService.updateUser(data);
      if (!user) {
        const errorData = {
          code: status.NOT_FOUND,
          message: 'User not found',
        };
        throw Util.buildCustomError(errorData);
      }

      return user;
    } catch (err) {
      throw Util.generateRpcError(err);
    }
  }
}

import { Injectable } from '@nestjs/common';
import {
  AppleSsoDTO,
  CreateUserGoogleDTO,
} from '@libs/dto/user/create-user.dto';
import { User } from '@libs/database/models/user.model';
import * as jwt from 'jsonwebtoken';
import { Util } from '../../../libs/util/util';
import { status } from '@grpc/grpc-js';
import { Strength } from '../../../libs/database/src/models/strength.model';
import { Skill } from '../../../libs/database/src/models/skill.model';
import * as crypto from 'crypto';

interface IAppleDecodedHeaderPayload {
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  c_hash: string;
  email: string;
  email_verified: boolean;
  auth_time: number;
  nonce_supported: boolean;
}
interface IAuthentictedResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private secret = process.env.CSRF_SECRET || 'your-secure-secret';
  private readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  private readonly refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  private readonly appleKeysUrl = 'https://appleid.apple.com/auth/keys';

  async loadUser(userId: number) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: [{ model: Strength }, { model: Skill }],
      });

      return {
        user: {
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
          skills: user.skills.map((skill) => skill.toJSON()) || [],
          strengths: user.strengths.map((strength) => strength.toJSON()) || [],
        },
      };
    } catch (err) {
      console.error(err);
      throw Util.generateRpcError({
        code: status.UNAUTHENTICATED,
        message: 'Unable to get user',
      });
    }
  }

  async googleSignIn(
    credentials: CreateUserGoogleDTO,
  ): Promise<IAuthentictedResponse> {
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
    return {
      user: user.toJSON(),
      accessToken: this.generateAccessToken({
        email: user.email,
        userId: user.id,
      }),
      refreshToken: this.generateRefreshToken({
        email: user.email,
        userId: user.id,
      }),
    };
  }

  async appleSignIn(data: AppleSsoDTO): Promise<IAuthentictedResponse> {
    const { email } = await this.verifyIdentityToken(data.identityToken);
    const [user, exist] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        name: data.fullName.middleName + ' ' + data.fullName.familyName,
      },
    });
    return {
      user: user.toJSON(),
      accessToken: this.generateAccessToken({ userId: user.id, email }),
      refreshToken: this.generateRefreshToken({ userId: user.id, email }),
    };
  }

  async verifyIdentityToken(identityToken: string) {
    try {
      const response = await fetch(this.appleKeysUrl);
      if (!response.ok) {
        throw Util.generateRpcError({
          code: status.INTERNAL,
          message: 'Unable to fetch keys',
        });
      }
      const { keys } = await response.json();

      const decodedHeader = jwt.decode(identityToken, { complete: true });
      if (!decodedHeader) {
        throw Util.generateRpcError({
          code: status.UNAUTHENTICATED,
          message: 'Unable to decode header',
        });
      }

      const kid = decodedHeader.header.kid;
      const alg = decodedHeader.header.alg;

      const key = keys.find((k) => k.kid === kid && k.alg === alg);
      if (!key) {
        throw Util.generateRpcError({
          code: status.UNAUTHENTICATED,
          message: 'Unable to find key',
        });
      }

      const publicKey = this.convertKeyToPEM(key);
      const appleDecodedHeader =
        decodedHeader.payload as IAppleDecodedHeaderPayload;

      // const verifiedToken = jwt.verify(identityToken, publicKey, {
      //   algorithms: ['RS256'],
      //   issuer: 'https://appleid.apple.com',
      //   audience: '<YOUR_APP_CLIENT_ID>', // Replace with your app's client ID
      // });

      return { email: appleDecodedHeader.email };
    } catch (error) {
      console.error('Error verifying Apple identity token:', error);
      throw Util.generateRpcError({
        code: status.UNAUTHENTICATED,
        message: 'Unable to verify token',
      });
    }
  }

  private convertKeyToPEM(key): string {
    const modulus = key.n;
    const exponent = key.e;

    const pem = `
      -----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQE${modulus}AQAB${exponent}
      -----END PUBLIC KEY-----
    `;
    return pem.replace(/\s+/g, '\n').trim();
  }

  generateAccessToken(payload: { userId: number; email: string }) {
    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: '7d',
    });
    return accessToken;
  }
  generateRefreshToken(payload: { userId: number; email: string }) {
    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: '30d',
    });
    return refreshToken;
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, this.accessTokenSecret);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, this.refreshTokenSecret);
    } catch (error) {
      return null;
    }
  }
}

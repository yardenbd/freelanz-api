import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { Util } from '../../../../libs/util/util';
import { User } from '../../../../libs/database/src/models/user.model';

@Injectable()
export class TwilioService {
  private twilioClient: Twilio;
  private readonly sid = 'AC22093ada02be4e9268dc897e4f3936a2';
  private readonly authToken = 'e1bc23d846312a614b161f116b46ed2e';
  private readonly service = 'VAc7f260caec30bc57661a293abdb31118';

  constructor() {
    this.twilioClient = new Twilio(this.sid, this.authToken);
  }

  async sendOtp(phoneNumber: string) {
    try {
      // const serviceSid = this.configService.get<string>('TWILIO_SERVICE_SID');
      await this.twilioClient.verify.v2
        .services(this.service)
        .verifications.create({
          to: phoneNumber,
          channel: 'sms', // or 'call' for voice OTP
        });
      return { message: 'code sent' };
    } catch (err) {
      throw Util.generateRpcError({ code: 13, message: err });
    }
  }

  async verifyOtp(phoneNumber: string, code: string) {
    try {
      // const serviceSid = this.configService.get<string>('TWILIO_SERVICE_SID');
      await this.twilioClient.verify.v2
        .services(this.sid)
        .verificationChecks.create({
          to: phoneNumber,
          code,
        });
      const [user, exist] = await User.findOrCreate({
        where: {
          phone_number: phoneNumber,
        },
        defaults: { phone_number: phoneNumber },
      });
      return { message: 'phone verified' };
    } catch (err) {
      throw Util.generateRpcError({ code: 13, message: err });
    }
  }
}

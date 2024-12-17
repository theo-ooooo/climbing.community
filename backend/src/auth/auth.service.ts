import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly membersSerivce: MembersService,
  ) {}

  kakaoGetAuthorize(): string {
    const clientId = this.configService.get<string>('auth.kakao.clientId');
    const redirectUri = this.configService.get<string>(
      'auth.kakao.redirectUri',
    );

    return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&prompt=login`;
  }

  async kakaoCallback({ code }: { code: string }) {
    try {
      const tokenData = await this.kakaoGetToken({ code });

      const accessToken = tokenData?.access_token;

      if (!accessToken) {
        throw new Error(`kakao token not found`);
      }

      const kakaoMemberData = await this.kakaoGetAccountInformation({
        token: accessToken,
      });

      const oauthData = await this.membersSerivce.getOauthInformation({
        oauthId: kakaoMemberData.id,
        provider: 'kakao',
      });

      if (oauthData) {
        const member = await this.membersSerivce.getMemberById({
          memberId: oauthData.memberId,
        });
      }

      const member = await this.membersSerivce.registerSocial({
        oauthId: kakaoMemberData.id,
        provider: 'kakao',
      });
    } catch (e) {
      throw e;
    }
  }

  async kakaoGetToken({ code }: { code: string }) {
    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get<string>('auth.kakao.clientId'),
          reddirect_uri: this.configService.get<string>(
            'auth.kakao.redirectUri',
          ),
          code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async kakaoGetAccountInformation({ token }: { token: string }) {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

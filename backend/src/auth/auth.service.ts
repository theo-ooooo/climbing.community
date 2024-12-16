import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
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

      console.log(kakaoMemberData);
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

  async getOauthInformation({
    oauthId,
    provider,
  }: {
    oauthId: string;
    provider: string;
  }): Promise<boolean> {
    try {
      const data = await this.prisma.oauthInformation.findFirst({
        where: { oauthId, provider },
      });
      return !!data;
    } catch (e) {
      throw e;
    }
  }
}

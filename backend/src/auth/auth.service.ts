import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Member } from '@prisma/client';
import axios from 'axios';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly membersSerivce: MembersService,
    private readonly jwtService: JwtService,
  ) {}

  async kakaoCallback({ code }: { code: string }) {
    try {
      const tokenData = await this.kakaoGetToken({ code });

      const kakaoAccessToken = tokenData?.access_token;

      if (!kakaoAccessToken) {
        throw new Error(`kakao token not found`);
      }

      const kakaoMemberData = await this.kakaoGetAccountInformation({
        token: kakaoAccessToken,
      });

      const oauthData = await this.membersSerivce.getOauthInformation({
        oauthId: kakaoMemberData.id,
        provider: 'kakao',
      });

      let member: Member;

      if (oauthData) {
        member = await this.membersSerivce.getMemberById({
          memberId: oauthData.memberId,
        });
      } else {
        member = await this.membersSerivce.registerSocial({
          oauthId: kakaoMemberData.id,
          provider: 'kakao',
        });
      }

      const accessToken = this.createJwtToken({
        memberId: member.id,
        provider: 'kakao',
        tokenType: 'accessToken',
      });

      const refreshToken = this.createJwtToken({
        memberId: member.id,
        provider: 'kakao',
        tokenType: 'refreshToken',
      });

      return { accessToken, refreshToken };
    } catch (e) {
      console.error('222', e);
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
      console.log(1111, e.response.data);
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

  createJwtToken({
    memberId,
    provider,
    tokenType,
  }: {
    memberId: number;
    provider: string;
    tokenType: string;
  }) {
    return this.jwtService.sign(
      { memberId, provider },
      { expiresIn: tokenType === 'accessToken ' ? '1d' : '7d' },
    );
  }
}

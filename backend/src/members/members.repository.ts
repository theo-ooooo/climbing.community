import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getRandomNickname } from '@woowa-babble/random-nickname';
import {
  Member,
  OauthInformation,
  PrismaClient,
  Profile,
} from '@prisma/client';

import * as runtime from '@prisma/client/runtime/library.js';

@Injectable()
export class MembersRepository {
  constructor(private readonly prisma: PrismaService) {}

  generateNickname(): string {
    return getRandomNickname('animals');
  }

  async createMember({
    username,
    password,
    prisma,
  }: {
    username?: string;
    password?: string;
    prisma: Omit<PrismaClient, runtime.ITXClientDenyList>;
  }): Promise<Member> {
    try {
      const member = await prisma.member.create({
        data: { username, password },
      });

      return member;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createProfile({
    memberId,
    prisma,
  }: {
    memberId: number;
    prisma: Omit<PrismaClient, runtime.ITXClientDenyList>;
  }): Promise<Profile> {
    try {
      const profile = await prisma.profile.create({
        data: { memberId, nickname: this.generateNickname() },
      });

      return profile;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createOauthInformation({
    memberId,
    oauthId,
    provider,
    prisma,
  }: {
    memberId: number;
    oauthId: string;
    provider: string;
    prisma: Omit<PrismaClient, runtime.ITXClientDenyList>;
  }): Promise<OauthInformation> {
    try {
      const oauthInformation = await prisma.oauthInformation.create({
        data: { memberId, oauthId, provider },
      });

      return oauthInformation;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMemberById({ memberId }: { memberId: number }) {
    try {
      return this.prisma.member.findUnique({
        where: { id: memberId },
        include: {
          profile: {
            select: {
              nickname: true,
              profileImageUrl: true,
            },
          },
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOauthInformation({
    oauthId,
    provider,
  }: {
    oauthId: string;
    provider: string;
  }): Promise<OauthInformation> {
    try {
      const data = await this.prisma.oauthInformation.findFirst({
        where: { oauthId, provider },
      });
      return data;
    } catch (e) {
      throw e;
    }
  }
}

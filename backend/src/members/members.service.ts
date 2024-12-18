import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MembersRepository } from './members.repository';
import { Member } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly membersRepository: MembersRepository,
  ) {}

  async registerSocial({
    oauthId,
    provider,
  }: {
    oauthId: string;
    provider: string;
  }): Promise<Member> {
    try {
      return this.prisma.$transaction<Member>(async (prisma) => {
        const member = await this.membersRepository.createMember({ prisma });

        await Promise.all([
          this.membersRepository.createProfile({
            memberId: member.id,
            prisma,
          }),
          this.membersRepository.createOauthInformation({
            memberId: member.id,
            oauthId,
            provider,
            prisma,
          }),
        ]);
        return member;
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getMemberById({ memberId }: { memberId: number }) {
    try {
      return this.membersRepository.getMemberById({ memberId });
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
  }) {
    try {
      return this.membersRepository.getOauthInformation({ oauthId, provider });
    } catch (e) {
      throw e;
    }
  }
}

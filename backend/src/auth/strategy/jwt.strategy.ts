import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly membersService: MembersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies.accessToken || null;
        },
      ]),
      secretOrKey: configService.get('auth.jwt.secret'),
    });
  }

  async validate(payload: { memberId: number; provider: string }) {
    return await this.membersService.getMemberById({
      memberId: payload.memberId,
    });
  }
}

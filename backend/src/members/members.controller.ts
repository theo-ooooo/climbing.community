import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCookieAuth,
  ApiTags,
} from '@nestjs/swagger';

@Controller('members')
@ApiTags('멤버 API')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: '내 정보 가져오기',
    description: 'AccessToken 통해 정보를 가져옵니다.',
  })
  @ApiOkResponse({
    description: '내정보',
  })
  @ApiCookieAuth('accessToken')
  getMe(@Req() req: Request) {
    return this.membersService.getMemberById({ memberId: req.user.memberId });
  }
}

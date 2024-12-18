import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Provider } from 'src/constants';
import { SocialLoginDto } from './dto/social-login.dto';
import {
  ApiCookieAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/social-login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '소셜 로그인 API (카카오, 네이버)',
    description: '로그인 및 회원가입 진행한다',
  })
  @ApiOkResponse({
    description: '쿠키로 Token를 생성한다.',
  })
  async socialLogin(
    @Body() body: SocialLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      if (body.provider === Provider.KAKAO) {
        const tokens = await this.authService.kakaoCallback({
          code: body.code,
        });

        res.cookie('accessToken', tokens.accessToken, {
          httpOnly: true,
          domain: 'localhost',
          path: '/',
          secure: true,
          expires: new Date(new Date(Date.now() + 1000 * 60 * 60)),
        });

        res.cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          path: '/',
          domain: 'localhost',
          secure: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });

        return tokens;
      }
      throw new HttpException('NOT FOUND PROVIDER', HttpStatus.NOT_FOUND);
    } catch (e) {
      console.error('socialLogin error :', e);
      throw e;
    }
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Token 재발급',
    description: 'AccessToken 만료시 RefreshToken으로 재발급',
  })
  @ApiOkResponse({
    description: '쿠키로 Token를 생성한다.',
  })
  @ApiHeader({ name: 'cookie.refreshToken', description: 'refreshToken' })
  async refrech(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;

    try {
      const tokens = await this.authService.refresh({ refreshToken });

      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        secure: true,
        expires: new Date(new Date(Date.now() + 1000 * 60 * 60)),
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        path: '/',
        domain: 'localhost',
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });

      return tokens;
    } catch (e) {
      res.clearCookie('accessToken', { domain: 'localhost', path: '/' });
      res.clearCookie('refreshToken', { domain: 'localhost', path: '/' });
      throw e;
    }
  }

  @Delete('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '로그아웃',
    description: 'AccessToken, RefreshToken 삭제',
  })
  @ApiOkResponse({
    description: '로그아웃 완료',
  })
  @ApiCookieAuth('accessToken')
  logout(@Req() req: Request, @Res() res: Response) {
    if (req.user) {
      res.clearCookie('accessToken', { domain: 'localhost', path: '/' });
      res.clearCookie('refreshToken', { domain: 'localhost', path: '/' });
      return { message: '로그아웃' };
    } else {
      throw new UnauthorizedException('token_not_valid');
    }
  }
}

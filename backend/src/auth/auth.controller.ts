import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Provider } from 'src/constants';
import { SocialLoginDto } from './dto/social-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/social-login')
  @HttpCode(HttpStatus.OK)
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
}

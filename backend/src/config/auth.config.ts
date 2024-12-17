import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID,
    redirectUri: process.env.KAKAO_REDIRECT_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}));

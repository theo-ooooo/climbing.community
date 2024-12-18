import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  environment: process.env.ENVIRONMENT,
  frontendUrl: process.env.FRONTEND_URL,
  swagger: {
    user: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASSWORD,
  },
}));

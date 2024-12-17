import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  environment: process.env.ENVIRONMENT,
  frontendUrl: process.env.FRONTEND_URL,
}));

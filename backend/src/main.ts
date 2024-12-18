import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  const configService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: configService.get('common.frontendUrl'),
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();

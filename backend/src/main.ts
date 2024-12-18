import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { CommonResponseInterceptor } from './interceptor/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);

  app.enableCors({
    credentials: true,
    origin: configService.get('common.frontendUrl'),
  });

  await prismaService.enableShutdownHooks();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Climbing Community')
    .setDescription('클라이밍 커뮤니티 API 문서')
    .setVersion('1.0.0')
    .addTag('climbing')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new CommonResponseInterceptor());
  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();

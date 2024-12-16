import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // app.setGlobalPrefix('/api/v1');

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks();
  await app.listen(4000);
}
bootstrap();

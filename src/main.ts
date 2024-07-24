import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'

const port = process.env.PORT || 3001

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL')
  })

  await app.listen(port);
}
bootstrap();

import { ConfigService } from '@nestjs/config/dist/config.service';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from './app.module';
import { Receiver } from './auth/receiver/receiver';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const quequeName = configService.get('QUEQUE_NAME');
  const jwtService = new JwtService({});
  const receiver = new Receiver(quequeName, jwtService);

  receiver.connect();
  await app.listen(port);
}

bootstrap();

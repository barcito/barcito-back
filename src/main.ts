import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { ValidateInputPipe } from './common/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalGuards(new AccessTokenGuard(reflector));
  await app.listen(3000);
}
bootstrap();

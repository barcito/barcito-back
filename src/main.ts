import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AccessTokenGuard } from 'common/guards/accessToken.guard';
import { ValidateInputPipe } from 'common/pipes/validate.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.enableCors({
    origin: [
      process.env.FRONTEND_DESKTOP_URL,
      process.env.FRONTED_MOBILE_URL
    ],
    credentials: true
  });
  app.use(cookieParser());
  /* app.useGlobalFilters(new HttpExceptionFilter()); */
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalGuards(new AccessTokenGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('Barcito API')
    .setDescription('Barcito Endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

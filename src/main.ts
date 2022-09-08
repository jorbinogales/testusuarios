import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EasyConfiguration } from './configuration/easyConfig.service';
import { env } from 'process';
import { EasyconfigService } from 'nestjs-easyconfig';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

async function bootstrap() {
  console.log('-------------INICIO-------------');
  const app = await NestFactory.create(AppModule);

  const configService: EasyConfiguration = app.get(EasyconfigService);
  const objConfig = configService['envConfig'];

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: objConfig.APP_ORIGIN });
  console.log('ENVIROMENTS');
  console.log('DB_HOST:', objConfig.DB_HOST || process.env.DB_HOST);
  console.log('DB_USERNAME:', objConfig.DB_USERNAME || process.env.DB_USERNAME);
  console.log('DB_PASSWORD:', objConfig.DB_PASSWORD || process.env.DB_PASSWORD);
  console.log('DB_DATABASE:', objConfig.DB_DATABASE || process.env.DB_DATABASE);
  console.log('DB_PORT:', objConfig.DB_PORT || process.env.DB_PORT);
  console.log(`APP_ORIGIN: ${objConfig.APP_ORIGIN || process.env.PORT}`);
  console.log(`PORT: ${objConfig.PORT || process.env.PORT}`);

  const options = new DocumentBuilder()
    .setTitle('PEOPLE TEST')
    .setDescription('THE API BACK')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'XYZ')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(objConfig.PORT || process.env.PORT || 4000);
  console.log('FINALIZO-----------------------------------');
}
bootstrap();

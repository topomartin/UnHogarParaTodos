import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Logger } from '@nestjs/common/services/logger.service';
import { ConsoleLogger } from '@nestjs/common/services/console-logger.service';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { FileLogger } from './common/fileLogger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

const appConfig = require(join(process.cwd(), 'config', 'app.config'));

 

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  //VALIDATIONS
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //LOGGER
  const logger = new Logger('Main');
  //FILE LOGGER
  app.useLogger(new FileLogger());
  

  //API PREFIX
  app.setGlobalPrefix(appConfig.app.globalPrefix);

  //CORS
  app.enableCors();

  //SWAGGER API DOCS
  const config = new DocumentBuilder()
    .setTitle('Un Hogar para Todos')
    .setDescription('Un Hogar para Todos API documentation')
    .setVersion('1.0')
    .addTag('--')
    .addApiKey(
    {
      type: 'apiKey',
      name: 'x-api-key', 
      in: 'header',
    },
    'swagger-api-key', 
  )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerApiURL = `${appConfig.app.globalPrefix}/${appConfig.app.swaggerURL}/`;
  SwaggerModule.setup(swaggerApiURL, app, document);
  logger.log(`API documentacion available from ${swaggerApiURL}`)


  //APP SERVER PORT 
  const port = appConfig.app.port || 3000;
  await app.listen(port);
  logger.log(`UnHogarParaTodos App listening on port ${port}`);
}
bootstrap();

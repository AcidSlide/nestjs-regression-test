import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { name as pjsonName, version as pjsonVersion, description as pjsonDescription, author as pjsonAuthor } from '../package.json';
import * as dotenv from 'dotenv';
import * as dotenvExt from 'dotenv-extended';
import { resolve } from 'path';
import * as fmp from 'fastify-multipart';
import {NotFoundExceptionFilter} from './not-found-exception.filter';

declare const module: any;
const majorVersion = pjsonVersion.split('.').shift();
const logger = new Logger('main');

logger.debug('Loading Environments');
dotenv.config({
  path: resolve(__dirname, '../../.env'),
});
logger.debug('Loading Extended Environments');
dotenvExt.load({
  schema: resolve(__dirname, '../../.env.schema'),
  defaults: resolve(__dirname, '../../.env.defaults'),
  errorOnMissing: true,
});
logger.debug(`Host Env: ${process.env.HOST}`);
logger.debug(`Port Env: ${process.env.PORT}`);

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const fastifyAdapter = new FastifyAdapter({
    logger: true,
    trustProxy: true,
    ignoreTrailingSlash: true,
  });

  fastifyAdapter.register(fmp, {
    limits: {
      // fieldNameSize: 100, // Default: 100, Max field name size in bytes
      // fieldSize: 1000000, // Default: 1MB, Max field value size in bytes
      fields: 10,         // Default: Unlimited, Max number of non-file fields
      fileSize: 2097152,      // Set: 2MB, Default: Unlimited, For multipart forms, the max file size
      files: 10,           // Set: 10, Default: Unlimited, Max number of file fields
      // headerPairs: 2000,   // Default: 2000, Max number of header key=>value pairs
    },
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // new FastifyAdapter({
    //   logger: true,
    // }),
    fastifyAdapter,
  );
  app.enableCors();

  let basePath = process.env.BASE_PATH || 'api';
  if (process.env.VERSION_PATH === 'true') {
    basePath += '/v' + majorVersion;
  }
  if (process.env.RANDOM_PATH) {
    basePath += '/' + process.env.RANDOM_PATH;
  }
  logger.debug(`Base Path: ${basePath}`);

  app.setGlobalPrefix(basePath);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidUnknownValues: true,
    validationError: { target: false },
  }));
  app.useGlobalFilters(new NotFoundExceptionFilter());

  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  // TODO: Update API specs for Swagger on all API endpoint (based on latest update of modules 20191205)
  const options = new DocumentBuilder()
    .setTitle(pjsonDescription + ' v' + pjsonVersion)
    .setDescription(pjsonDescription + ' Specifications')
    .setVersion('1.0')
    // .setBasePath(basePath)
    // .addBearerAuth('Authorization', 'header')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(basePath + '/explorer', app, document);

  await app.listen(+(process.env.PORT), process.env.HOST);

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();

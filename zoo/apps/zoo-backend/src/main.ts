import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';

const globalPrefix = 'api';
const port = process.env.BACKEND_PORT || 3000;
const host = process.env.BACKEND_HOST || 'localhost';


function setupOpenApi(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('API zoo Documentation')
        .setDescription('API zoo documentation')
        .addBearerAuth()
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, { useGlobalPrefix: true });

    Logger.log(`🚀 OpenAPI is running on: http://${ host }:${ port }/${ globalPrefix }/swagger`);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(globalPrefix);
    setupOpenApi(app);

    await app.listen(port, host);

    Logger.log(`🚀 Application is running on: http://${ host }:${ port }/${ globalPrefix }`);
}

bootstrap()
    .then();

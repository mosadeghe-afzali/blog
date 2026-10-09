import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LogFilter } from './shared/filter/log.filter.js';
import { ApiKeyGuard } from './shared/guards/api-key.guard.js';
import { IdPipe } from './shared/pipes/id.pipe.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true }
    })
  )
  app.useGlobalPipes(new IdPipe());
  // app.useGlobalGuards(new ApiKeyGuard())
  // app.useGlobalFilters(new LogFilter())
  const config = new DocumentBuilder().setTitle('Nest App').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/documentation', app, document)
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

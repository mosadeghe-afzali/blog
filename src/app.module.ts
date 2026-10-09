import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BlogModule } from './blog/blog.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { join, dirname } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { fileURLToPath } from 'url';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LogFilter } from './shared/filter/log.filter.js';
import { Log, logSchema } from './shared/schemas/log.schema.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();
import { ConfigModule } from '@nestjs/config';
import { LogInterceptor } from './shared/interceptors/log.interceptor.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname)


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL!),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'file'),
      serveRoot: '/file'
    }),
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: logSchema
      }
    ]),

    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'nest-app',
    }),
    BlogModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: LogFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor
    }
  ],
})
export class AppModule { }

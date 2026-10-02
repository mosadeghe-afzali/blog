import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BlogModule } from './blog/blog.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { join, dirname } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { fileURLToPath } from 'url';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname)

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-app'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'file'),
      serveRoot: '/file'
    }),
    
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
  providers: [AppService],
})
export class AppModule {}

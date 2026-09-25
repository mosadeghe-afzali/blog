import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BlogModule } from './blog/blog.module.js';
import { MongooseModule } from '@nestjs/mongoose';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-app'),
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

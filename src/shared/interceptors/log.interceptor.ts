import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { AppService } from '../../app.service.js';
import { LogType } from '../schemas/log.schema.js';


@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly appService: AppService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    return next.handle().pipe(tap( async (response) => {
      if(request.method != 'GET') {
        await this.appService.log({
          content: JSON.stringify(response),
          url: request.url,
          type: request.method as LogType,
        })
      }
    }));
  }
}

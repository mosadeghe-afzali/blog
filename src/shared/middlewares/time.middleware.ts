import { Injectable, NestMiddleware } from '@nestjs/common';
import { time, timeEnd } from 'console';

@Injectable()
export class TimeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('time')
    time('Time')
    res.on('finished', () => {
      timeEnd('Time')
    })
    next();
  }
}

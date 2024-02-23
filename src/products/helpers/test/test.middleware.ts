import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const CIDHEADER = 'x-correlation-id';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const id = randomUUID();
    req[CIDHEADER] = id;
    res.set(CIDHEADER, id)

    console.log('Request...', req.method, req.url, req.headers);
    next();
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const amqp = require('amqplib/callback_api')

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  private quequeName = 'test queque';
  private channel;
  private isAutorized: boolean | string = false;

  constructor() {
    amqp.connect('amqp://localhost', (connectionError, connection) => {
      if (connectionError) throw connectionError;
        
      connection.createChannel((channelError, channel) => {
        if (channelError) throw channelError;
            
        this.channel = channel.assertQueue(this.quequeName);
        this.channel.consume(this.quequeName, msg => {
          this.isAutorized = msg.content && msg.content.toString();
        });
      });
    });
  }

  private waitForResponse(next: NextFunction, req: Request, res: Response, counter = 0): void {
    if (this.isAutorized !== null || counter > 100) {
      if (this.isAutorized === 'true') {
        this.isAutorized = false;
  
        next();
      }
      else
        res.status(403).json({
          statusCode: 403,
          timestamp: new Date().toISOString(),
          error: '403: Unauthorized',
        });
      return;
    }
    setTimeout(() => {
      counter++;
      return this.waitForResponse(next, req, res, counter);
    }, 50);
  }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    this.isAutorized = null;
    const { authorization } = req.headers;
    await this.channel.sendToQueue(this.quequeName, Buffer.from(JSON.stringify({ authorization })));
    await this.waitForResponse(next, req, res);
  }
}

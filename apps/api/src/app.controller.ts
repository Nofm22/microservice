import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
  ) {}

  @Get()
  getUSer() {
    return this.authService.send(
      {
        cmd: 'get-user',
      },
      {},
    );
  }
}

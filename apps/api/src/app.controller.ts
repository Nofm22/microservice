import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
  ) {}

  @Post('auth')
  postUser() {
    try {
      return this.authService.send(
        {
          cmd: 'post-user',
        },
        {},
      );
    } catch (error) {
      console.log(error);
    }
  }
  @Get('auth')
  getUSer() {
    try {
      return this.authService.send(
        {
          cmd: 'get-user',
        },
        {},
      );
    } catch (error) {
      console.log(error);
    }
  }
}

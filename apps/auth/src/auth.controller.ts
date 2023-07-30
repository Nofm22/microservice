import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Ctx,
  MessagePattern,
  RmqContext,
  EventPattern,
} from '@nestjs/microservices';
import { PrismaService } from './prisma.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() context: RmqContext) {
    const chanel = context.getChannelRef();
    const message = context.getMessage();
    chanel.ack(message);
    return { user: 'USER' };
  }

  @MessagePattern({ cmd: 'post-user' })
  async createUser(@Ctx() context: RmqContext) {
    console.log('log');
    const chanel = context.getChannelRef();
    const message = context.getMessage();

    chanel.ack(message);
    const user = await this.prismaService.users.create({
      data: {
        name: 'ptnminh',
      },
    });
    return { user };
  }
}

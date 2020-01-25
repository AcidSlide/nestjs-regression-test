import {Controller, Get, Request, Post, UseGuards, Req, Res, Logger, Ip} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import {CurrentUser} from './users/entity/user.decorator';
import {CurrentUserInterface} from './users/dto/current-user.interface';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(@Ip() ip): string {
    this.logger.warn(`IP: ${ip}`);
    return this.appService.getHello(null);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('test')
  getHelloTest(@CurrentUser() currentUser: CurrentUserInterface): string {
    return this.appService.getHello(currentUser.user);
  }
}

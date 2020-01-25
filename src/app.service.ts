import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    // protected readonly mailerService: MailerService,
  ) {}

  getHello(user: string): any {
    this.logger.debug(user);
    const email: string = 'testing@email.com';
    return {
      message: `Hello World! ${email}`,
    };
  }
}

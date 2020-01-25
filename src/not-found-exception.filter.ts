import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger, NotFoundException} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NotFoundExceptionFilter.name);

  catch(exception: NotFoundException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    this.logger.warn('Caught NotFoundException');
    this.logger.warn(`RequestIP: ${request.ip}`);
    this.logger.warn(`StatusCode: ${status}`);
    this.logger.warn(`URL: ${request.raw.url}`);
    this.logger.warn(`Headers: ${JSON.stringify(request.headers)}`);
    this.logger.warn(`Params: ${JSON.stringify(request.params)}`);
    response.code(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: 'Unauthorized',
    });
    // response.code(status).send({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    // });
    // response
    //   .status(status)
    //   .json({
    //     statusCode: status,
    //     timestamp: new Date().toISOString(),
    //   });
  }
}

import { createParamDecorator } from '@nestjs/common';

// see reference: https://docs.nestjs.com/techniques/authentication
export const CurrentUser = createParamDecorator((data, req) => req.user);

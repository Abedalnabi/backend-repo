// get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser } from '../interfaces/current-user.interface';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest<{ user: CurrentUser }>();
    return request.user;
  },
);

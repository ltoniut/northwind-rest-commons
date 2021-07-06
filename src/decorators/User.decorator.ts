import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { Context } from '@src/shared/dtos/context';

export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();
    const req: Request = http.getRequest();
    req.user = { name: 'Leandro' };
    const { user } = req;
    if (!user) {
      throw new UnauthorizedException();
    }
    return new Context({ req, ...user });
  },
);

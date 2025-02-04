import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest();
		console.log(`Request.user => ${req.user}`);
		return req.user;
	},
);

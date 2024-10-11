import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '@security/service/security.service';
import { Reflector } from '@nestjs/core';
import { from, map, Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '@common/config/metadata';
import { isNil } from 'lodash';
import {
	NoTokenFoundException,
	TokenExpiredException,
} from '@security/security.exception';
import { Credential } from '@security/model/entity';

@Injectable()
export class JwtGuard implements CanActivate {
	private readonly logger: Logger = new Logger('JwtGuard');

	constructor(
		private readonly jwtService: JwtService,
		private readonly securityService: SecurityService,
		private readonly reflector: Reflector,
	) {}

	canActivate(
		ctx: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		// We check if route have @Public decorator
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			ctx.getHandler(),
			ctx.getClass(),
		]);

		return isPublic
			? true
			: this.validateToken(ctx.switchToHttp().getRequest());
	}

	private validateToken(req: any): Observable<boolean> {
		if (!isNil(req.headers['authorization'])) {
			try {
				const id = this.jwtService.verify(
					req.headers['authorization'].replace('Bearer ', ''),
				).sub;

				return from(this.securityService.detail(id)).pipe(
					map((user: Credential) => {
						// Here we attach the user credential to the request
						req.user = user;

						return true;
					}),
				);
			} catch (e) {
				this.logger.error(e);
				throw new TokenExpiredException();
			}
		}

		throw new NoTokenFoundException();
	}
}

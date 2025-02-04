import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { instanceToPlain } from 'class-transformer';
import { ApiCodeResponse } from '@common/api/api-code-response';
import { configManager } from '@common/config';
import { ConfigKey } from '@common/enum';
import { isNil } from 'lodash';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
	private readonly logger: Logger = new Logger('ApiInterceptor');

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> | Promise<Observable<any>> {
		const ctx = context.switchToHttp();
		const path = ctx.getRequest().route.path;

		return next.handle().pipe(
			map((response: any) => {
				return {
					code: this.map(path),
					/**
					 * instanceToPlain from class-transformer will understand @Exclude({ toPlainOnly: true })
					 * and exclude the password when serializing Credential object
					 */
					data: instanceToPlain(response),
					result: true,
				};
			}),
		);
	}

	private map(path: string): ApiCodeResponse {
		this.logger.log(`path ${path}`);

		// Here, we construct the key for ApiCodeResponse
		// parsing the path to convert it to our standard key
		const part = path
			.replace(configManager.getValue(ConfigKey.APP_BASE_URL), '')
			.split('/')
			.filter((e) => e.length > 0)
			.slice(0, 2)
			.map((s) => s.toUpperCase());

		const code =
			ApiCodeResponse[
				`${part.join('_')}_SUCCESS` as keyof typeof ApiCodeResponse
			];
		// If the key doesn't exist, we return the standard code
		return isNil(code) ? ApiCodeResponse.SUCCESS : code;
	}
}

import { ApiCodeResponse } from '@common/api/api-code-response';

export interface ApiResponse {
	result: boolean;
	code: ApiCodeResponse;
	data: any;
}

export enum ApiCodeResponse {
	SUCCESS = 'api.result.success',
	NO_TOKEN_FOUND_EXCEPTION = 'api.exception.no_token_found',
	USER_NOT_FOUND_EXCEPTION = 'api.exception.user_not_found',
	TOKEN_EXPIRED = 'api.exception.token_expired',
	SIGN_UP_EXCEPTION = 'api.exception.sign_up_error',
	CREDENTIAL_DELETED_EXCEPTION = 'api.exception.credential_deleted',
	USER_ALREADY_EXISTS = 'api.exception.user_already_exists',
	TOKEN_GENERATION_EXCEPTION = 'api.exception.token_generation',
	UNAUTHORIZED_OPERATION_EXCEPTION = 'api.exception.unauthorized_operation',
}

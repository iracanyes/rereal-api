import { ApiException } from '@common/api/exceptions/api.exception';
import { ApiCodeResponse } from '@common/api/api-code-response';

export class NoTokenFoundException extends ApiException {
	constructor() {
		super(ApiCodeResponse.NO_TOKEN_FOUND_EXCEPTION, 401);
	}
}

export class UserNotFoundException extends ApiException {
	constructor() {
		super(ApiCodeResponse.USER_NOT_FOUND_EXCEPTION, 200);
	}
}

export class TokenExpiredException extends ApiException {
	constructor() {
		super(ApiCodeResponse.TOKEN_EXPIRED, 401);
	}
}

export class SignUpException extends ApiException {
	constructor() {
		super(ApiCodeResponse.SIGN_UP_EXCEPTION, 200);
	}
}

export class CredentialDeletedException extends ApiException {
	constructor() {
		super(ApiCodeResponse.CREDENTIAL_DELETED_EXCEPTION, 200);
	}
}

export class UserAlreadyExistsException extends ApiException {
	constructor() {
		super(ApiCodeResponse.USER_ALREADY_EXISTS, 200);
	}
}

export class TokenGenerationException extends ApiException {
	constructor() {
		super(ApiCodeResponse.TOKEN_GENERATION_EXCEPTION, 500);
	}
}

export class UnauthorizedOperationException extends ApiException {
	constructor() {
		super(ApiCodeResponse.UNAUTHORIZED_OPERATION_EXCEPTION, 401);
	}
}

export class SignOutException extends ApiException {
	constructor() {
		super(ApiCodeResponse.SIGN_OUT_EXCEPTION, 200);
	}
}

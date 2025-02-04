import {ApiException} from "@common/api/exceptions/api.exception";
import {ApiCodeResponse} from "@common/api/api-code-response";

export class NoAppFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.NO_APP_FOUND_EXCEPTION, 200);
  }

}

export class CreateAppException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CREATE_APP_EXCEPTION, 200);
  }
}
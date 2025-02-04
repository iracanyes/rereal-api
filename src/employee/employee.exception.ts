import {ApiException} from "@common/api/exceptions/api.exception";
import {ApiCodeResponse} from "@common/api/api-code-response";

export class NoEmployeeFoundException extends ApiException{
  constructor() {
    super(ApiCodeResponse.NO_EMPLOYEE_FOUND_EXCEPTION, 200);
  }
}
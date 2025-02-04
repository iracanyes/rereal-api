import {ApiException} from "@common/api/exceptions/api.exception";
import {ApiCodeResponse} from "@common/api/api-code-response";

export class NoReportFoundException extends ApiException{
  constructor() {
    super(ApiCodeResponse.NO_REPORT_FOUND_EXCEPTION, 200);
  }
}

export class NoReportAttachmentFoundException extends ApiException{
  constructor() {
    super(ApiCodeResponse.NO_REPORT_ATTACHMENT_FOUND_EXCEPTION, 404);
  }
}

export class CreateReportException extends ApiException{
  constructor() {
    super(ApiCodeResponse.CREATE_REPORT_EXCEPTION, 400);
  }
}
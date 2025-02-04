import {ApiException} from "@common/api/exceptions/api.exception";
import {ApiCodeResponse} from "@common/api/api-code-response";

export class NoEquipmentFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.NO_EQUIPMENT_FOUND_EXCEPTION, 200);
  }
}
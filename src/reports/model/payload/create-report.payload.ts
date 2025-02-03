import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {} from "express";
import {Equipment, Application, EventEntity} from "@common/model/entity";
import {ApiProperty} from "@nestjs/swagger";

export class CreateReportPayload {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  additionalInformation: string;

  @ApiProperty()
  @IsOptional()
  application_id: string;

  @ApiProperty()
  @IsOptional()
  equipment_id: string;

  @ApiProperty()
  @IsOptional()
  events: EventEntity[];

}
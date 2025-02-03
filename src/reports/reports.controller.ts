import {Controller, Get, Post, Put, Delete, Body, Param, Logger} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {ReportControllerSwaggerDoc} from "./reports.swagger";
import {ReportsService} from "@reports/service/report.service";
import { Report } from '@common/model/entity';
import { Credential } from '@security/model/entity';
import {CreateReportPayload} from "@reports/model/payload/create-report.payload";
import {User} from "@common/config/metadata";
import {NoReportFoundException} from "@reports/report.exception";

@ApiBearerAuth('access-token')
@ApiTags("Reports' routes")
@Controller('reports')
export class ReportsController {
  private readonly logger: Logger = new Logger(ReportsController.name);

  constructor(private readonly reportsService: ReportsService) {

  }

  @ApiOperation(ReportControllerSwaggerDoc.list)
  @Get("list")
  public async list(): Promise<Report[]> {
    try {
      return await this.reportsService.list();
    }catch (e) {
      this.logger.error(e);
      throw new NoReportFoundException();
    }
  }

  @ApiOperation(ReportControllerSwaggerDoc.get)
  @Get(":id")
  public async get(@Param("id") id: string): Promise<Report> {
    return await this.reportsService.get(id);
  }

  @ApiOperation(ReportControllerSwaggerDoc.create)
  @Post("create")
  public create(@Body() payload: CreateReportPayload, @User() user: Credential): Promise<Report> {
    return this.reportsService.create(payload, user);
  }
}

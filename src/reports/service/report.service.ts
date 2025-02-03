import {Inject, Injectable, Logger} from "@nestjs/common";
import {Report, Application, Equipment} from "@common/model/entity";
import { Credential } from "@security/model/entity";
import {InjectRepository} from "@nestjs/typeorm";
import {
  CreateReportException,
  NoReportAttachmentFoundException,
  NoReportFoundException
} from "@reports/report.exception";
import {CreateReportPayload} from "@reports/model/payload/create-report.payload";
import {Builder, IBuilder} from "builder-pattern";
import {isNil} from "lodash";
import {Repository} from "typeorm";
import {EmployeeService} from "@employee/service/employee.service";
import {ApplicationService} from "@application/service/application.service";
import {EquipmentService} from "@equipment/service/equipment.service";

@Injectable()
export class  ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(Report) private  readonly reportRepository: Repository<Report>,
    @Inject(ApplicationService) private readonly applicationService: ApplicationService,
    @Inject(EquipmentService) private readonly equipmentService: EquipmentService,
    @Inject(EmployeeService) private readonly employeeService: EmployeeService,
  ) {
  }

  async list(): Promise<Report[]> {
    try {
      return await this.reportRepository.find();
    }catch (e) {
      this.logger.error(e);
      throw new NoReportFoundException();
    }
  }

  async get(id: string): Promise<Report> {
    try {
      return await this.reportRepository.findOneBy({id: id});
    }catch (e) {
      this.logger.error(e);
      throw new NoReportFoundException();
    }
  }

  async create(payload: CreateReportPayload, user: Credential): Promise<Report> {

    try{
      // Get last healthcheck report

      //
      let reportBuilder = Builder<Report>()
        .type(payload.type)
        .status(payload.status)
        .additionalInformation(payload.additionalInformation);

      // Get employee by email
      const employee = await this.employeeService.findOneByEmail(user.email);
      reportBuilder.author(employee)

      // TODO: Add metrics
      reportBuilder.downTime(0)
        .upTime(0.0)
        .responseTime(0.0);

      if(!isNil(payload.application_id)){
        // TODO: Get application
        const app: Application = await this.applicationService.findOne(payload.application_id);
        // Set application on report
        reportBuilder.application(app);

      } else if(!isNil(payload.equipment_id)){
        // TODO: Get equipment
        const equipment: Equipment = await this.equipmentService.findOne(payload.equipment_id);

        reportBuilder.equipment(equipment);
      }else{
        throw new NoReportAttachmentFoundException();
      }

      return await this.reportRepository.save(reportBuilder.build());
    }catch (e) {
      this.logger.error(e);
      throw new CreateReportException();
    }
  }
}
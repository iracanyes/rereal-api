import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {
  Application,
  Employee,
  Equipment,
  EventEntity,
  Report,
  LocationEntity,
  Site,
  Ticket,
} from "@common/model/entity";
import { ReportsController } from "@reports/reports.controller";
import { ReportsService } from "@reports/service/report.service";
import {ApplicationService} from "@application/service/application.service";
import {EquipmentService} from "@equipment/service/equipment.service";
import {EmployeeService} from "@employee/service/employee.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, Employee, Application, Equipment, EventEntity, LocationEntity, Site, Ticket ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ApplicationService, EquipmentService, EmployeeService],
})
export class ReportsModule {}

import { Module } from '@nestjs/common';
import { EmployeeService } from './service/employee.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Employee} from "@common/model/entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee])
  ],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}

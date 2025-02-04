import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import {EquipmentService} from "@equipment/service/equipment.service";
import {Equipment} from "@common/model/entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment]),
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}

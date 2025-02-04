import {Equipment} from "@common/model/entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {NoEquipmentFoundException} from "@equipment/equipment.exception";
import {Logger} from "@nestjs/common";

export class EquipmentService{
  private readonly logger: Logger = new Logger(EquipmentService.name);
  constructor(@InjectRepository(Equipment) private readonly equipmentRepository: Repository<Equipment>,) {
  }

  async list(){
    try {
      return await this.equipmentRepository.find();
    }catch (e) {
      this.logger.error(e);
      throw new NoEquipmentFoundException();
    }
  }

  async findOne(id: string): Promise<Equipment> {
    try {
      return await this.equipmentRepository.findOneBy({ id: id});
    }catch (e) {
      this.logger.error(e);
      throw new NoEquipmentFoundException();
    }
  }
}
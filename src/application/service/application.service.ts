import {Inject} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Application} from "@common/model/entity";
import {NoAppFoundException} from "../application.exception";
import {Repository} from "typeorm";

export class ApplicationService {
  constructor(@InjectRepository(Application) private readonly appRepository: Repository<Application>,) {
  }

  async list(): Promise<Application[]> {
    try {
      return await this.appRepository.find();
    }catch (e) {
      console.error(e);
      throw new NoAppFoundException();
    }
  }

  async findOne(id: string): Promise<Application> {
    try {
      return await this.appRepository.findOneBy({ id: id });
    }catch (e) {
      console.error(e);
      throw new NoAppFoundException();
    }
  }
}
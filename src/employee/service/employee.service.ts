import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "@common/model/entity";
import {Repository} from "typeorm";
import {NoEmployeeFoundException} from "../employee.exception";

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(NoEmployeeFoundException.name);

  constructor(@InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,) {
  }

  async findOneByEmail(email: string): Promise<Employee> {
    try {
      return await this.employeeRepository.findOneBy({ email: email });
    }catch (e) {
      this.logger.error(e);
      throw  new NoEmployeeFoundException();
    }
  }


}

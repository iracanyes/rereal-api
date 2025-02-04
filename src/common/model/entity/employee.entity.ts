import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {employeePkGenerator} from "@common/config";
import { BaseEntity, Report, Ticket } from "@common/model/entity";
import {EmployeeRole} from "@common/enum/employee.role";

@Entity()
export class Employee extends BaseEntity {
  @PrimaryColumn('varchar', { length: 60, default: () => `'${employeePkGenerator()}'`})
  id: string;

  @Column('varchar', { length: 60, unique: true })
  matricule: string;

  @Column('varchar', { length: 60 })
  firstname: string;

  @Column('varchar', { length: 60 })
  lastname: string;

  @Column('varchar', { length: 60, unique: true })
  email: string;

  @Column('enum', { enum: EmployeeRole, nullable: false, unique: false, default: EmployeeRole.EMPLOYEE })
  role: EmployeeRole;

  @OneToMany(() => Report, (report) => report.author )
  reports: Report[];

  @OneToMany(() => Ticket, (ticket) => ticket.author)
  tickets: Ticket[];
}
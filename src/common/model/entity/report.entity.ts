import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {reportPkGenerator} from "@common/config";
import {
  BaseEntity,
  Employee,
  Application,
  Equipment
} from "@common/model/entity";


@Entity()
export class Report extends BaseEntity {
  @PrimaryColumn('varchar', { length: 60, default: () => `'${reportPkGenerator()}'`})
  id: string;

  @Column({ name: 'type', type: 'varchar', nullable: false, })
  type: string;

  @Column({ name: 'response_time', type: 'numeric', nullable: false, })
  responseTime: number;

  @Column({ name: 'status', type: 'varchar', nullable: false, })
  status: string;

  @Column({ name: 'up_time', type: 'numeric', nullable: false, })
  upTime: number;

  @Column({ name: 'down_time', type: 'numeric', nullable: false, })
  downTime: number;

  @Column({ name: 'additional_information', type: 'text', nullable: true, })
  additionalInformation: string;

  @ManyToOne(() => Employee, (employee) => employee.reports)
  @JoinColumn({ referencedColumnName: 'id', name: 'employee_id'})
  author: Employee;

  @ManyToOne(() => Application, (application) => application.reports, { nullable: true, cascade: true, eager: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'application_id'})
  application?: Application;

  @ManyToOne(() => Equipment, (equipment) => equipment.reports, { nullable: true, cascade: true, eager: true})
  @JoinColumn({ referencedColumnName: 'id', name: 'equipment_id'})
  equipment?: Equipment
}
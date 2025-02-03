import { BaseEntity, Report } from "@common/model/entity";
import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {equipmentPkGenerator} from "@common/config";
import {EventEntity} from "@common/model/entity/event.entity";

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryColumn('varchar', { length: 255, default: () => `'${equipmentPkGenerator()}'` })
  id: string;

  @Column('varchar', { length: 255, nullable: true, unique: false })
  ip: string;

  @Column('numeric', { nullable: true, unique: false })
  healthcheckPort: number;

  @Column('varchar', { length: 255, nullable: true, unique: false })
  url: string;

  @OneToMany(() => Report, (report) => report.equipment)
  reports: Report[];

  @OneToMany(() => EventEntity, (event) => event.equipment)
  events: EventEntity[];


}
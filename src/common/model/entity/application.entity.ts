import {applicationPkGenerator} from "@common/config";
import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import { BaseEntity, Report } from "@common/model/entity";
import {EventEntity} from "@common/model/entity/event.entity";

@Entity()
export class Application extends  BaseEntity{
  @PrimaryColumn('varchar', { length: 60, default: () => `'${applicationPkGenerator()}'`})
  id: string;

  @Column('varchar', { length: 125, nullable: false, unique: true })
  name: string;

  @Column('varchar', { length: 255, nullable: true, unique: false })
  ip: string;

  @Column('numeric', { nullable: true, unique: false })
  healthcheckPort: number;

  @Column('varchar', { length: 255, nullable: true, unique: false })
  url: string;

  @OneToMany(() => Report, (report: Report) => report.application)
  reports: Report[];

  @OneToMany(() => EventEntity, (event) => event.equipment)
  events: EventEntity[];
}
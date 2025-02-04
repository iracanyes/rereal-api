import {BaseEntity} from "@common/model/entity/base.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {ticketPkGenerator} from "@common/config";
import {Employee, EventEntity} from "@common/model/entity";

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 60, default: () => `'${ticketPkGenerator()}'`})
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true})
  title: string;

  @Column({ type: 'text', nullable: false})
  description: string;

  @OneToOne(() => EventEntity, (event) => event.ticket, { nullable: false, cascade: false, eager: true })
  event: Event;

  @ManyToOne(() => Employee, (employee) => employee.tickets, { cascade: true, eager: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'employee_id'})
  author: Employee;
}
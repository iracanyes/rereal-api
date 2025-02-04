import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {eventPkGenerator} from "@common/config";
import {
  Application,
  Equipment,
  Ticket
} from "@common/model/entity";

@Entity()
export class EventEntity {
  @PrimaryColumn('varchar', { length: 60, default: () => `'${eventPkGenerator()}'`})
  id: string;

  @Column('varchar', { length: 255, nullable: false, unique: false })
  type: string;

  @Column('varchar', { length: 255, nullable: false, unique: false })
  status: string;

  @Column('text', { nullable: false, unique: false })
  payload: string;

  @OneToOne(() => Ticket, (ticket) => ticket.event, { nullable: true })
  ticket: Ticket;

  @ManyToOne(() => Application, (application) => application.events, { nullable: true, cascade: true, eager: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'application_id'})
  application: Application;

  @ManyToOne(() => Equipment, (equipment) => equipment.events, { nullable: true, cascade: true, eager: true})
  @JoinColumn({ referencedColumnName: 'id', name: 'equipment_id'})
  equipment: Equipment;
}
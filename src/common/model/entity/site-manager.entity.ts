import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {siteManagerPkGenerator} from "@common/config";
import {Site, Manager, BaseEntity} from "@common/model/entity";

@Entity()
export class SiteManager extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 60, default: () => `'${siteManagerPkGenerator()}'`})
  id: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @ManyToOne(() => Manager, (manager) => manager.managedSites, { cascade: true, eager: true})
  @JoinColumn({ referencedColumnName: 'id', name: 'manager_id'})
  manager: Manager;

  @ManyToOne(() => Site, (site) => site.siteManagers, { cascade: true, eager: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'site_id'})
  site: Site;


}
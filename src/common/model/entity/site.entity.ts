import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import {sitePkGenerator} from "@common/config";
import {BaseEntity, LocationEntity, SiteManager} from "@common/model/entity";

@Entity()
export class Site extends BaseEntity {
  @PrimaryColumn('varchar', { length: 60, default: () => `'${sitePkGenerator()}'`})
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToOne(() => LocationEntity, (location) => location.site , { cascade: true, eager: true })
  location: LocationEntity;

  @OneToMany(() => SiteManager, (siteManager) => siteManager.manager, { })
  siteManagers: SiteManager[];
}
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import {sitePkGenerator} from "@common/config";
import {BaseEntity, Equipment, LocationEntity, SiteManager} from "@common/model/entity";

@Entity()
export class Site extends BaseEntity {
  @PrimaryColumn('varchar', { length: 60, default: () => `'${sitePkGenerator()}'`})
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToOne(() => LocationEntity, (location) => location.site , { nullable: false, cascade: true, eager: true })
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id'  })
  location: LocationEntity;

  @OneToMany(() => SiteManager, (siteManager) => siteManager.manager, { })
  siteManagers: SiteManager[];

  @OneToMany(() => Equipment, (equipment) => equipment.site, { eager: true})
  equipments: Equipment[];
}
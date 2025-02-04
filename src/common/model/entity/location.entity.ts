import {PrimaryColumn, OneToOne, Column, Entity} from "typeorm";
import {locationPkGenerator} from "@common/config";
import { Site } from '@common/model/entity';

@Entity()
export class LocationEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, default: () => `'${locationPkGenerator()}'` })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'varchar', length: 255 })
  number: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  zipCode: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;


  @OneToOne(() => Site, (site) => site.location , {})
  site: Site;
}
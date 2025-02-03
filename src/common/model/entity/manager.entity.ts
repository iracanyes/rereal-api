import {Entity, OneToMany, PrimaryColumn} from "typeorm";
import {managerPkGenerator} from "@common/config";
import { Employee, SiteManager } from "@common/model/entity";

@Entity()
export class Manager extends Employee {
  @PrimaryColumn({ type: 'varchar', length: 60, default: () => `'${managerPkGenerator()}'`})
  id: string;

  @OneToMany(() => SiteManager, (siteManager: SiteManager) => siteManager.manager, { })
  managedSites: SiteManager[];
}
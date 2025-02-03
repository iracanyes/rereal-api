import {CreateDateColumn, UpdateDateColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

export abstract class BaseEntity {
  @CreateDateColumn()
  @IsNotEmpty()
  createdAt: Date;

  @UpdateDateColumn()
  @IsNotEmpty()
  updatedAt: Date;
}
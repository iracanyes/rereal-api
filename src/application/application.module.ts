import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Application} from "@common/model/entity";
import {ApplicationService} from "./service/application.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
  ],
  exports: [ApplicationService],
  providers: [ApplicationService],
  controllers: [ApplicationController]
})
export class ApplicationModule {}

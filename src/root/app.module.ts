import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { configManager } from '@common/config';
import { SecurityModule } from '@security/security.module';
import { JwtGuard } from '@security/jwt';
import {ReportsModule} from "@reports/reports.module";
import {ApplicationModule} from "../application/application.module";
import {EquipmentModule} from "@equipment/equipment.module";
import {EmployeeService} from "../employee/service/employee.service";
import {EmployeeModule} from "@employee/employee.module";

@Module({
	imports: [
		TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
		SecurityModule,
		ReportsModule,
		ApplicationModule,
		EquipmentModule,
		EmployeeModule
	],
	controllers: [AppController],
	providers: [{ provide: 'APP_GUARD', useClass: JwtGuard }, AppService],
})
export class AppModule {}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppControllerGetHelloApiOperations } from './app-controller-getHello.api-operations';

@ApiTags('Route de base')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation(AppControllerGetHelloApiOperations)
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}

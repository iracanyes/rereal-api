import { NestFactory } from '@nestjs/core';
import { AppModule } from '@root/index';
import 'dotenv/config';
import { configManager } from '@common/config/config.manager';
import { ConfigKey } from '@common/enum';
import { HttpExceptionFilter } from '@common/config';
import { swaggerConfiguration } from '@common/docs/swagger.documentation';
import { Logger } from '@nestjs/common';
import { ApiInterceptor } from '@common/api/api.interceptor'; // Module not loaded with "@root"

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Configure API prefix
	app.setGlobalPrefix(configManager.getValue(ConfigKey.APP_BASE_URL));

	// Add ExceptionFilter
	app.useGlobalFilters(new HttpExceptionFilter());

	// Add Interceptors
	app.useGlobalInterceptors(new ApiInterceptor());

	// Swagger configuration
	swaggerConfiguration.config(app);

	await app.listen(configManager.getValue(ConfigKey.APP_PORT));
}

bootstrap().then(() => {
	const logger = new Logger('Main Logger');
	logger.log('Server started!');
});

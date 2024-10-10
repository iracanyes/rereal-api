import { NestFactory } from '@nestjs/core';
import { AppModule } from '@root/index';
import 'dotenv/config';
import { configManager } from '@common/config/config.manager';
import { ConfigKey } from '@common/enum';
import { HttpExceptionFilter } from '@common/config';
import { swaggerConfiguration } from '@common/docs/swagger.documentation';
import { Logger } from '@nestjs/common'; // Module not loaded with "@root"

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Add ExceptionFilter
	app.useGlobalFilters(new HttpExceptionFilter());

	// Swagger configuration
	swaggerConfiguration.config(app);

	await app.listen(configManager.getValue(ConfigKey.APP_PORT));
}

bootstrap().then(() => {
	const logger = new Logger('Main Logger');
	logger.log('Server started!');
});

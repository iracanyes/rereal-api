import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class SwaggerConfiguration {
	constructor() {}

	config(app: INestApplication) {
		const config = new DocumentBuilder()
			.setTitle('Swagger Documentation')
			.setDescription('Documentation')
			.setVersion('2024.0.1')
			.addBearerAuth(
				{
					description: 'Please enter token',
					name: 'Authorization',
					bearerFormat: 'Bearer',
					scheme: 'Bearer',
					type: 'http',
					in: 'Header',
				},
				'access-token',
			)
			.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('docs', app, document);
	}
}

const swaggerConfiguration = new SwaggerConfiguration();

export { swaggerConfiguration };
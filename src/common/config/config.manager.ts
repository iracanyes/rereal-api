import { ConfigKey, configMinimalKeys } from '@common/enum';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//import 'dotenv/config';

class ConfigManager {
	constructor(private readonly env: { [key: string]: string | undefined }) {}

	public ensureValues(keys: ConfigKey[]): this {
		keys.forEach((key: ConfigKey) => this.getValue(ConfigKey[key], true));

		return this;
	}

	getValue(key: ConfigKey, throwOnMissing: boolean = true): string {
		const value = this.env[key];

		if (!value && throwOnMissing) {
			throw new Error(`Config error - missing env.${key}`);
		}

		return value;
	}

	public getTypeOrmConfig(): TypeOrmModuleOptions {
		return {
			type: this.getValue(ConfigKey.DB_TYPE) as any,
			host: this.getValue(ConfigKey.DB_HOST),
			port: parseInt(this.getValue(ConfigKey.DB_PORT)),
			username: this.getValue(ConfigKey.DB_USER),
			password: this.getValue(ConfigKey.DB_PASSWORD),
			database: this.getValue(ConfigKey.DB_NAME),
			entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
			subscribers: [],
			synchronize:
				this.getValue(ConfigKey.DB_SYNC) === 'true' &&
				this.getValue(ConfigKey.APP_MODE) === 'DEV',
			logging: this.getValue(ConfigKey.DB_LOGGING) === 'true',
		};
	}
}

const configManager: ConfigManager = new ConfigManager(
	process.env,
).ensureValues(configMinimalKeys);

export { configManager };

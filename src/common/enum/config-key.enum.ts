export enum ConfigKey {
	APP_MODE = 'API_MODE',
	APP_PORT = 'API_PORT',
	APP_VERSION = 'API_VERSION',
	DB_TYPE = 'DB_TYPE',
	DB_NAME = 'DB_NAME',
	DB_HOST = 'DB_HOST',
	DB_PORT = 'DB_PORT',
	DB_USER = 'DB_ADMIN',
	DB_PASSWORD = 'DB_PASSWORD',
	DB_SYNC = 'DB_SYNC',
	DB_LOGGING = 'DB_LOGGING',
	JWT_TOKEN_SECRET = 'JWT_TOKEN_SECRET',
	JWT_TOKEN_EXPIRE_IN = 'JWT_TOKEN_EXPIRE_IN',
	JWT_REFRESH_TOKEN_SECRET = 'JWT_REFRESH_TOKEN_SECRET',
	JWT_REFRESH_TOKEN_EXPIRE_IN = 'JWT_REFRESH_TOKEN_EXPIRE_IN',
}

export const configMinimalKeys: ConfigKey[] = Object.keys(
	ConfigKey,
) as ConfigKey[];

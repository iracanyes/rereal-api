import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { configManager } from '@common/config';
import { SecurityModule } from '@security/security.module';
import { JwtGuard } from '@security/jwt';

@Module({
	imports: [
		TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
		SecurityModule,
	],
	controllers: [AppController],
	providers: [{ provide: 'APP_GUARD', useClass: JwtGuard }, AppService],
})
export class AppModule {}

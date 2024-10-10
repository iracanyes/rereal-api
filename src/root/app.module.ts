import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { configManager } from '@common/config';

@Module({
	imports: [TypeOrmModule.forRoot(configManager.getTypeOrmConfig())],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

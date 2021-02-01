import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PapersModel } from './papers.model';
import { PapersService } from './papers.service';
import { PapersController } from './papers.controller';

@Module({
	imports: [SequelizeModule.forFeature([PapersModel])],
	providers: [PapersService],
	controllers: [PapersController],
	exports: [SequelizeModule]
})
export class PapersModule {}

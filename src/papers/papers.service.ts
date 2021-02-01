import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { PapersModel } from './papers.model';

@Injectable()
export class PapersService {
	constructor(
		@InjectModel(PapersModel) private papersModel: typeof PapersModel,
		@Inject(Sequelize) private sequelize: Sequelize
	) { }

	async find(opts: { limit: number, offset: number }): Promise<PapersModel[]> {
		return this.papersModel.findAll({ ...opts, logging: console.log });
	}

	async findMostPopular(): Promise<PapersModel[]> {
		return this.papersModel.findAll({
			attributes: ['id', 'title', 'likes_count', 'dislikes_count'],
			limit: 8,
			order: [['likes_count', 'desc']],
			logging: console.log
		});
	}

	async findOneById(id: number): Promise<PapersModel> {
		return this.papersModel.findOne({ where: { id } });
	}

	async newPaper(body: any) {
		await this.papersModel.create(body);
	}
}

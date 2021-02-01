import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { ForumSectionsModel } from './forum.sections.model';
import { ForumSubsectionsModel } from './forum.subsections.model';
import { ForumThreadsModel } from './forum.threads.model';
import { ForumPostsModel } from './forum.posts.model';
import { UsersModel } from '../users/users.model';

@Injectable()
export class ForumService {
	constructor(
		@InjectModel(ForumSectionsModel) private forumSectionsModel: typeof ForumSectionsModel,
		@InjectModel(ForumSubsectionsModel) private forumSubsectionsModel: typeof ForumSubsectionsModel,
		@InjectModel(ForumThreadsModel) private forumThreadsModel: typeof ForumThreadsModel,
		@Inject(Sequelize) private sequelize: Sequelize
	) { }

	async findAllSections(): Promise<ForumSectionsModel[]> {
		// @ts-ignore
		return this.forumSectionsModel.findAll({ include: [ForumSubsectionsModel], logging: console.log });
	}

	async findSubsectionsBySectionId(section_id: number): Promise<ForumSubsectionsModel[]> {
		// @ts-ignore
		return this.forumSubsectionsModel.findAll({ where: { forum_section_id: section_id }, include: [], logging: console.log });
	}

	async findSubsectionById(subsection_id: number): Promise<ForumSubsectionsModel> {
		// @ts-ignore
		return this.forumSubsectionsModel.findOne({ where: { id: subsection_id }, include: [ForumThreadsModel], logging: console.log });
	}

	async findThreadById(thread_id: number): Promise<ForumThreadsModel> {
		// @ts-ignore
		return this.forumThreadsModel.findOne({
			where: { id: thread_id },
			include: [
				// @ts-ignore
				{ model: ForumPostsModel, include: [
					{ model: UsersModel, attributes: ['id', 'username', 'avatar'] }
				]}
			],
			order: Sequelize.literal('post_id asc'),
			logging: console.log
		});
	}

	// async findOneById(id: number): Promise<PapersModel> {
	// 	return this.papersModel.findOne({ where: { id } });
	// }

}

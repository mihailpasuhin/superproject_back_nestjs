import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ForumSectionsModel } from './forum.sections.model';
import { ForumSubsectionsModel } from './forum.subsections.model';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumThreadsModel } from './forum.threads.model';
import { ForumPostsModel } from './forum.posts.model';

@Module({
	imports: [SequelizeModule.forFeature([ForumSectionsModel, ForumSubsectionsModel, ForumThreadsModel, ForumPostsModel])],
	providers: [ForumService],
	controllers: [ForumController],
	exports: [SequelizeModule]
})
export class ForumModule {}

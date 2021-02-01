import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ForumSubsectionsModel } from './forum.subsections.model';
import { ForumPostsModel } from './forum.posts.model';

@Table({ tableName: 'forum_threads', timestamps: false})
export class ForumThreadsModel extends Model<ForumThreadsModel> {

	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	// @ts-ignore
	@ForeignKey(() => ForumSubsectionsModel)
	@Column
	forum_subsection_id: number;

	@Column
	title: string;

	// @ts-ignore
	@BelongsTo(() => ForumSubsectionsModel)
	subsection: ForumSubsectionsModel;

	// @ts-ignore
	@HasMany(() => ForumPostsModel)
	posts: ForumPostsModel[];

}

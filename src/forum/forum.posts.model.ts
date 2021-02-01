import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ForumThreadsModel } from './forum.threads.model';
import { UsersModel } from '../users/users.model';

@Table({ tableName: 'forum_posts', timestamps: false})
export class ForumPostsModel extends Model<ForumPostsModel> {

	@PrimaryKey
	@AutoIncrement
	@Column
	post_id: number;

	// @ts-ignore
	@ForeignKey(() => ForumThreadsModel)
	@Column
	forum_thread_id: number;

	// @ts-ignore
	@ForeignKey(() => UsersModel)
	@Column
	author_id: number;

	@Column
	timestamp: number;

	@Column
	text: string;

	// @ts-ignore
	@BelongsTo(() => ForumThreadsModel)
	thread: ForumThreadsModel;

	// @ts-ignore
	@BelongsTo(() => UsersModel)
	author: UsersModel;

}

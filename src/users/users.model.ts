import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ForumPostsModel } from '../forum/forum.posts.model';

@Table({ tableName: 'users', timestamps: false})
export class UsersModel extends Model<UsersModel> {

	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@Column
	username: string;

	@Column
	password_hash: string;

	@Column
	refresh_token: string;

	@Column
	first_name: string;

	@Column
	last_name: string;

	@Column
	email: string;

	@Column
	role: string;

	@Column
	avatar: string;

	// @ts-ignore
	@HasMany(() => ForumPostsModel)
	posts: ForumPostsModel[];

}

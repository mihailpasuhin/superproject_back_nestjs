import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ForumSubsectionsModel } from './forum.subsections.model';

@Table({ tableName: 'forum_sections', timestamps: false})
export class ForumSectionsModel extends Model<ForumSectionsModel> {

	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@Column
	title: string;

	// @ts-ignore
	@HasMany(() => ForumSubsectionsModel)
	subsections: ForumSubsectionsModel[];

}

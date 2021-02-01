import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ForumSectionsModel } from './forum.sections.model';
import { ForumThreadsModel } from './forum.threads.model';

@Table({ tableName: 'forum_subsections', timestamps: false})
export class ForumSubsectionsModel extends Model<ForumSubsectionsModel> {

	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	// @ts-ignore
	@ForeignKey(() => ForumSectionsModel)
	@Column
	forum_section_id: number;

	@Column
	title: string;

	// @ts-ignore
	@BelongsTo(() => ForumSectionsModel)
	section: ForumSectionsModel;

	// @ts-ignore
	@HasMany(() => ForumThreadsModel)
	threads: ForumThreadsModel[];

}

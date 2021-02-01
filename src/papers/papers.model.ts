import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'papers', timestamps: false})
export class PapersModel extends Model<PapersModel> {

	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@Column
	author_id: number;

	@Column
	title: string;

	@Column
	content: string;

	@Column
	likes_count: number;

	@Column
	dislikes_count: number;

	@Column({ type: DataType.JSON })
	tags: string[];

}

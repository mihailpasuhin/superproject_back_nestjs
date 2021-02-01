import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UsersModel } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(UsersModel) private usersModel: typeof UsersModel,
		@Inject(Sequelize) private sequelize: Sequelize
	) { }

	async findOne(username: string): Promise<UsersModel | undefined> {
		return this.usersModel.findOne({ where: { username }, raw: true });
	}

	async create(user: Partial<UsersModel> & { password: string }): Promise<UsersModel | undefined> {
		console.log(user);
		const salt = await bcrypt.genSalt();
		user.password_hash = await bcrypt.hash(user.password, salt);
		delete user.password;
		return this.usersModel.create(user);
	}

	async updateRefreshToken(id: number, refresh_token: string) {
		return this.usersModel.update(
			{ refresh_token },
			{ where: { id } }
		);
	}

	async deleteRefreshToken(id: number) {
		return this.usersModel.update(
			{ refresh_token: '' },
			{ where: { id } }
		);
	}

	async validateRefreshToken(id: number, refresh_token: string) {
		const user = await this.usersModel.findOne({ where: { id }, raw: true });
		return user.refresh_token === refresh_token;
	}
}

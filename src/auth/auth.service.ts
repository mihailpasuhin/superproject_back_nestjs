import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(username);
		if (user && bcrypt.compareSync(pass, user.password_hash)) {
			const { password_hash, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, id: user.id, role: user.role };
		const access_token = this.jwtService.sign(payload, { expiresIn: '10m' });
		const refresh_token =this.jwtService.sign(payload, { expiresIn: '30 days' });
		await this.usersService.updateRefreshToken(user.id, refresh_token);
		return {
			access_token,
			refresh_token
		};
	}

	async refreshTokens(user: any, header_refresh_token: string) {
		if (await this.usersService.validateRefreshToken(user.id, header_refresh_token)) {
			const payload = { username: user.username, id: user.id, role: user.role };
			const access_token = this.jwtService.sign(payload, { expiresIn: '10m' });
			const refresh_token = this.jwtService.sign(payload, { expiresIn: '30 days' });
			await this.usersService.updateRefreshToken(user.id, refresh_token);
			return {
				access_token,
				refresh_token
			};
		} else {
			throw new UnauthorizedException();
		}
	}

	async logout(id: number) {
		return this.usersService.deleteRefreshToken(id);
	}
}

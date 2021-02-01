import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {
	}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Post('/logout')
	async logout(@Request() req) {
		return this.authService.logout(req.user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/refreshTokens')
	async refreshTokens(@Request() req) {
		const headerRefreshToken = req.headers['authorization'].split(' ')[1];
		return this.authService.refreshTokens(req.user, headerRefreshToken);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}

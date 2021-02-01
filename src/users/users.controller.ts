import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {	}
	//
	// @Get('/')
	// get(
	// 	@Query('limit') limit,
	// 	@Query('offset') offset
	// ) {
	// 	return this.papersService.find({
	// 		limit: +limit || 10,
	// 		offset: +offset || 0
	// 	});
	// }
	//
	@Get('/')
	findOne(@Body('username') username: string) {
		return this.usersService.findOne(username);
	}

	@Post('/create')
	create(@Body() body: any) {
		return this.usersService.create(body);
	}

	@UseGuards(JwtAuthGuard)
	@Get('my-profile')
	async getProfile(@Request() req) {
		const { password_hash, ...user } = await this.usersService.findOne(req.user.username);
		return user;
	}

}

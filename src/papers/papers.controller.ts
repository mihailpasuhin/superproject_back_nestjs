import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PapersService } from './papers.service';

@Controller('papers')
export class PapersController {
	constructor(private papersService: PapersService) {	}

	@Get('/')
	get(
		@Query('limit') limit,
		@Query('offset') offset
	) {
		return this.papersService.find({
			limit: +limit || 10,
			offset: +offset || 0
		});
	}

	@Get('/findMostPopular')
	findMostPopular() {
		return this.papersService.findMostPopular();
	}

	@Get('/:id')
	getOne(@Param('id') id: number) {
		return this.papersService.findOneById(id);
	}

	@Post('/newPaper')
	newPaper(@Body() body: any) {
		return this.papersService.newPaper(body);
	}

}

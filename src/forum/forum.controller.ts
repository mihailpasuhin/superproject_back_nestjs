import { Controller, Get, Param, Query } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
	constructor(private forumService: ForumService) {	}

	@Get('/sections')
	getSections() {
		return this.forumService.findAllSections();
	}

	@Get('/subsections')
	getSubsections(
		@Query() params: { section_id: number }
	) {
		return this.forumService.findSubsectionsBySectionId(params.section_id);
	}

	@Get('/subsection')
	getSubsection(
		@Query() params: { subsection_id: number }
	) {
		return this.forumService.findSubsectionById(params.subsection_id);
	}

	@Get('/thread')
	getThread(
		@Query() params: { thread_id: number }
	) {
		return this.forumService.findThreadById(params.thread_id);
	}

}

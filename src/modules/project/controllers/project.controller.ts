import { Body, CurrentUser, JsonController, Post, Res, UseBefore } from 'routing-controllers';
import { CreateProjectRequest } from '../request/project.request';
import { User } from '../../user/entities/user.entity';
import SuccessResponse from '../../../core/response/success.response';
import ProjectService from '../services/project.service';
import { Response } from 'express';
import { IsAuthenticated } from '../../../core/middlewares/authentication.middleware';

@JsonController('/project')
@UseBefore(IsAuthenticated)
class ProjectController {
	private projectService: ProjectService;

	constructor() {
		this.projectService = new ProjectService();
	}

  @Post()
	public async create(@CurrentUser() user: User, @Body({ validate: true, required: true }) body: CreateProjectRequest, @Res() res: Response) {
		const project = await this.projectService.createProject(body, user);

		return new SuccessResponse(project);
	}
}

export default ProjectController;

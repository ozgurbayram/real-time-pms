import {
	Body,
	CurrentUser,
	Get,
	JsonController,
	Param,
	Post,
	Res,
	UseBefore,
} from 'routing-controllers';
import { CreateProjectRequest } from '../request/project.request';
import { User } from '../../user/entities/user.entity';
import ProjectService from '../services/project.service';
import { IsAuthenticated } from '../../../core/middlewares/authentication.middleware';
import { Response } from 'express';

@JsonController('/projects')
@UseBefore(IsAuthenticated)
class ProjectController {
	private projectService: ProjectService;

	constructor() {
		this.projectService = new ProjectService();
	}

  @Get('/:id')
	public async get(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Res() res: Response,
	) {
		const project = await this.projectService.getProject(id, user);

		return res.json({
			data: project,
			message: 'Project fetched successfully',
		});
	}

  @Get()
  public async list(@CurrentUser() user: User, @Res() res: Response) {
  	const projects = await this.projectService.getProjects(user);

  	return res.json({
  		data: projects,
  		message: 'Projects fetched successfully',
  	});
  }

  @Post()
  public async create(
    @CurrentUser() user: User,
    @Body({ validate: true, required: true }) body: CreateProjectRequest,
    @Res() res: Response,
  ) {
  	const data = await this.projectService.createProject(body, user);

  	return res.json({
  		data: data,
  		message: 'Project created successfully',
  	});
  }
}

export default ProjectController;

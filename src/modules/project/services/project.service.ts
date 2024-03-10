import { TaskStaus } from '../../task/enums/task-status.enum';

import TaskService from '../../task/services/task.service';
import { User } from '../../user/entities/user.entity';
import Project from '../entities/project.entity';
import ProjectRepository from '../repositorties/project.repository';
import { CreateProjectRequest } from '../request/project.request';

class ProjectService {
	private projectRepository: ProjectRepository;
	private taskService: TaskService;
	constructor() {
		this.projectRepository = new ProjectRepository();
		this.taskService = new TaskService();
	}

	public async createProject(body: CreateProjectRequest, user: User) {
		const project = new Project();
		project.name = body.name;
		project.creator = user;

		const data = await this.projectRepository.save(project);

		const deafultTask = await this.taskService.createTask(
			{
				name: `Project ${data.name}'s #1.Task`,
				status: TaskStaus.DRAFT,
				project_id: data.id,
			},
			user,
		);

		return {
			project: {
				data,
				tasks: [{ ...deafultTask }],
			},
		};
	}
}

export default ProjectService;

import { TaskStaus } from '../../task/enums/task-status.enum';
import TaskService from '../../task/services/task.service';
import { User } from '../../user/entities/user.entity';
import Project from '../entities/project.entity';
import ProjectRepository from '../repositorties/project.repository';
import { CreateProjectRequest } from '../network/project.request';
import { isEmpty } from 'lodash';

class ProjectService {
	private projectRepository: ProjectRepository;
	private taskService: TaskService;

	constructor() {
		this.projectRepository = new ProjectRepository();
		this.taskService = new TaskService();
	}

	public async getProjects(user: User) {
		const projects = await this.projectRepository.find({
			where: {
				creator: {
					id: user.id,
				},
			},
			order: {
				created_at: 'desc',
			},
		});

		if (isEmpty(projects)) {
			throw new Error('No projects found');
		}

		return projects;
	}

	public async getProject(projectId: number, user: User) {
		const project = await this.projectRepository.findOne({
			where: { id: projectId, creator: { id: user.id } },
		});

		if (!project) {
			throw new Error('No project not found');
		}

		return project;
	}

	public async createProject(body: CreateProjectRequest, user: User) {
		const project = await this.projectRepository.save(
			new Project(body.name, user),
		);

		const deafultTask = await this.taskService.createTask(
			{
				name: `Project ${project.name}'s #1.Task`,
				status: TaskStaus.DRAFT,
				project_id: project.id,
			},
			user,
		);

		return {
			project,
			tasks: [{ ...deafultTask }],
		};
	}

	public async updateProject(projectId: number, user: User) {
		const project = await this.projectRepository.findOne({
			where: { id: projectId, creator: { id: user.id } },
		});

		if (!project) {
			throw new Error('Project not found');
		}

		const updatedProject = await this.projectRepository.save(project);

		return updatedProject;
	}

	public async deleteProject(projectId: number, user: User) {
		const project = await this.projectRepository.findOne({
			where: { id: projectId, creator: { id: user.id } },
		});

		await this.taskService.deleteTasksOfProject(projectId);

		if (!project) {
			throw new Error('Project not found');
		}

		await this.projectRepository.delete(projectId);

		return true;
	}
}

export default ProjectService;

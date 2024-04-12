import ProjectRepository from '../../project/repositorties/project.repository';
import { User } from '../../user/entities/user.entity';
import Task from '../entities/task.entity';
import TaskRepository from '../repositories/task.repository';
import { CreateTaskRequest } from '../network/task.request';

class TaskService {
	private taskRepository: TaskRepository;
	private projectRepository: ProjectRepository;

	constructor() {
		this.taskRepository = new TaskRepository();
		this.projectRepository = new ProjectRepository();
	}

	public async createTask(body: CreateTaskRequest, user: User) {
		const { name, status, project_id } = body;

		const project = await this.projectRepository.findOneOrFail({
			where: { id: project_id },
		});

		const task = new Task();

		task.create(name, status, project, user);

		const data = await this.taskRepository.save(task);

		return { task: data };
	}

	public async deleteTasksOfProject(projectId: number) {
		await this.taskRepository.delete({ project: { id: projectId } });
	}
}

export default TaskService;

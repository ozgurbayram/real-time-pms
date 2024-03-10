import ProjectRepository from '../../project/repositorties/project.repository';
import { User } from '../../user/entities/user.entity';
import Task from '../entities/task.entity';
import TaskRepository from '../repositorties/task.repository';
import { CreateTaskRequest } from '../requests/task.request';

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

		task.name = name;
		task.status = status;
		task.creator = user;
		task.project = project;

		const data = await this.taskRepository.save(task);

		return { task: data };
	}
}

export default TaskService;

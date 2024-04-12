import {
	Body,
	CurrentUser,
	JsonController,
	Post,
	UseBefore,
} from 'routing-controllers';
import { IsAuthenticated } from '../../../core/middlewares/authentication.middleware';
import TaskService from '../services/task.service';
import { User } from '../../user/entities/user.entity';
import { CreateTaskRequest } from './task.request';

@JsonController('/task')
@UseBefore(IsAuthenticated)
class TaskController {
	private taskSevice: TaskService;

	constructor() {
		this.taskSevice = new TaskService();
	}

  @Post()
	public async create(
    @CurrentUser() user: User,
    @Body({ validate: true }) body: CreateTaskRequest,
	) {
		const data = await this.taskSevice.createTask(body, user);

		return data;
	}
}

export default TaskController;

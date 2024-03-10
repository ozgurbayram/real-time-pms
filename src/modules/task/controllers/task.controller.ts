import { Body, CurrentUser, JsonController, Post, UseBefore } from 'routing-controllers';
import { IsAuthenticated } from '../../../core/middlewares/authentication.middleware';
import TaskService from '../services/task.service';
import { User } from '../../user/entities/user.entity';
import { CreateTaskRequest } from '../requests/task.request';
import SuccessResponse from '../../../core/response/success.response';

@JsonController('/task')
@UseBefore(IsAuthenticated)
class TaskController {
	private taskSevice: TaskService;

	constructor() {
		this.taskSevice = new TaskService();
	}

  @Post()
	public async create(@CurrentUser() user: User, @Body({ validate: true, transform: { version: 3 } }) body: CreateTaskRequest) {
		const data = await this.taskSevice.createTask(body, user);

		return new SuccessResponse(data);
	}
}

export default TaskController;

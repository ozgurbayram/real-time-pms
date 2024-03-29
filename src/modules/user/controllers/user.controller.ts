import { Controller, Get, UseBefore } from 'routing-controllers';
import UserService from '../services/user.service';
import { IsAuthenticated } from '../../../core/middlewares/authentication.middleware';

@Controller('/users')
@UseBefore(IsAuthenticated)
class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

  @Get()
	public async list() {
		return this.userService.listUsers();
	}
}

export default UserController;

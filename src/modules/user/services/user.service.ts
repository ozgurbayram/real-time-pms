import AbstractException from '../../../core/exception/abstract.exception';
import { HttpStatusCode } from '../../../enums/http.codes.enum';
import { RegisterRequest } from '../../auth/network/auth.requests';
import { User } from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';

class UserService {
	private userRepo: UserRepository;

	constructor() {
		this.userRepo = new UserRepository();
	}

	public async listUsers() {
		return await this.userRepo.find();
	}
	
	public async createUser({ email, password, password_confirm }: RegisterRequest) {
		const isExist = await this.userRepo.findOne({
			where: { email: email },
		});

		if (isExist) {
			throw new AbstractException('User already exist', HttpStatusCode.Conflict);
		}

		if (password !== password_confirm) {
			throw new AbstractException('Password Mismatch', HttpStatusCode.BadRequest);
		}

		const user = new User();

		user.email = email;

		await user.setPassword(password);

		await this.userRepo.save(user);

		return user;
	}
}

export default UserService;

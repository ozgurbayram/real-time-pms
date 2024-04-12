import { isEmpty } from 'lodash';
import UserRepository from '../../user/repositories/user.repository';
import AbstractException from '../../../core/exception/abstract.exception';
import { Auth } from '../auth.types';
import TokenService from './token.service';
import { UserNotFoundException } from '../network/auth.exceptions';
import { HttpStatusCode } from '../../../enums/http.codes.enum';

class AuthService {
	private userRepo: UserRepository;
	private tokenService: TokenService;

	constructor() {
		this.userRepo = new UserRepository();
		this.tokenService = new TokenService();
	}

	public async verifyCredentials(email: string, password: string) {
		const user = await this.userRepo.findOne({ where: { email } });

		if (isEmpty(user)) {
			throw new UserNotFoundException();
		}

		const isPasswordCorrect = await user.validatePassword(password);

		if (!isPasswordCorrect) {
			throw new AbstractException(
				'Password is incorrect',
				HttpStatusCode.BadRequest,
			);
		}

		return user;
	}

	public async loginViaPasswordGrant(
		email: string,
		password: string,
	): Promise<Auth> {
		const user = await this.verifyCredentials(email, password);

		if (!user) {
			throw new AbstractException(
				'Invalid credentials',
				HttpStatusCode.BadRequest,
			);
		}

		const tokens = await this.tokenService.generateUserTokens(user);

		return tokens;
	}

	public async refreshToken(token: string) {
		const { user_id, acccess_token, refresh_token } =
      await this.tokenService.verifyRefreshToken(token);

		await this.tokenService.revokeAccessToken(acccess_token);
		await this.tokenService.revokeRefreshToken(refresh_token);

		const user = await this.userRepo.findOne({
			where: { id: user_id },
		});

		if (!user) {
			throw new AbstractException('User not found', 404);
		}

		return await this.tokenService.generateUserTokens(user);
	}
}

export default AuthService;

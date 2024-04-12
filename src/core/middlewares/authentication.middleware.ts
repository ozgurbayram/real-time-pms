import { Request, Response, NextFunction } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import UserRepository from '../../modules/user/repositories/user.repository';
import TokenService from '../../modules/auth/service/token.service';
import { HttpStatusCode } from '../../enums/http.codes.enum';

export class IsAuthenticated implements ExpressMiddlewareInterface {
	private userRepo: UserRepository;
	private tokenService: TokenService;

	constructor() {
		this.userRepo = new UserRepository();
		this.tokenService = new TokenService();
	}

	async use(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(HttpStatusCode.Unauthorized).json({ message: 'Authentication required' });
		}

		const { user_id } = await this.tokenService.verifyAccessToken(token);

		const user = await this.userRepo.findOneOrFail({
			where: { id: user_id },
		});

		req.user = user;

		next();
	}
}

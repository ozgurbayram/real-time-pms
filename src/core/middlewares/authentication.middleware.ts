import { Request, Response, NextFunction } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserRepository from '../../modules/user/repositories/user.repository';

export class IsAuthenticated implements ExpressMiddlewareInterface {
	private userRepo: UserRepository;

	constructor() {
		this.userRepo = new UserRepository();
	}

	async use(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Authentication required' });
		}

		try {
			const decoded = jwt.verify(token, 'token-secret');

			const user = await this.userRepo.findOneOrFail({ where: { id: (decoded as JwtPayload)?.userId } });

			req.user = user;

			next();
		} catch (err) {
			res.status(401).json({ message: 'Invalid or expired token' });
		}
	}
}

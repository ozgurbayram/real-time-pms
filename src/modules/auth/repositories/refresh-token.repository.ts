import { Repository } from 'typeorm';
import RefreshToken from '../entities/refresh-token.entity';
import { AppDataSource } from '../../../integrations/database';

class RefreshTokenRepository extends Repository<RefreshToken> {
	constructor() {
		super(RefreshToken, AppDataSource.manager);
	}
}

export default RefreshTokenRepository;

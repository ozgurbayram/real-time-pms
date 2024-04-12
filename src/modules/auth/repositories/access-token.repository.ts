import { Repository } from 'typeorm';
import AccessToken from '../entities/access-token.entity';
import { AppDataSource } from '../../../integrations/database';

class AccessTokenRepository extends Repository<AccessToken> {
	constructor() {
		super(AccessToken, AppDataSource.manager);
	}
}

export default AccessTokenRepository;

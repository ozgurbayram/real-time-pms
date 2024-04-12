import AbstractException from '../../../core/exception/abstract.exception';
import { HttpStatusCode } from '../../../enums/http.codes.enum';

export class UserNotFoundException extends AbstractException {
	constructor() {
		super('User not found', HttpStatusCode.NotFound);
	}
}


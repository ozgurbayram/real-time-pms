import { HttpStatusCode } from '../../enums/http.codes.enum';

class AbstractException extends Error {
	message: string;
	status: HttpStatusCode;

	constructor(message: string = 'Internal Server Error', status: HttpStatusCode = HttpStatusCode.InternalServerError) {
		super(message);
		this.message = message;
		this.status = status;
	}
}

export default AbstractException;

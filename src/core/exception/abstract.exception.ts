import { HttpStatusCode } from "../../enums/http.codes.enum";

class AbstractException extends Error {
  message: string;
  status: HttpStatusCode;

  constructor(message: string = "Internal Server Error", status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export default AbstractException;

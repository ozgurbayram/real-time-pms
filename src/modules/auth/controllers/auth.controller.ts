import { Request, Response } from "express";
import { Body, JsonController, Middleware, Post, Req, Res } from "routing-controllers";
import SuccessResponse from "../../../core/response/success.response";
import UserService from "../../user/services/user.service";
import { LoginRequest, RegisterRequest } from "../requests/auth.requests";
import AuthService from "../services/auth.service";

@JsonController("/auth")
class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  @Post("/login")
  public async login(@Body() body: LoginRequest, @Res() res: Response) {
    const { email, password } = body;

    const data = await this.authService.loginViaPasswordGrant(email, password);

    return new SuccessResponse({ ...data }).send(res);
  }

  @Post("/register")
  public async register(@Body({ validate: true }) body: RegisterRequest) {
    const { email, password, password_confirm } = body;

    const user = await this.userService.createUser({
      email,
      password,
      password_confirm,
    });

    const data = await this.authService.loginViaPasswordGrant(user.email, password);

    return new SuccessResponse({ ...data });
  }

  @Post("/refresh_token")
  public async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refresh_token } = req.body;

    const data = await this.authService.refreshToken(refresh_token);

    return new SuccessResponse({ data }, "Refresh token sucecss").send(res);
  }

  @Post("/logout")
  public async logout(@Req() req: Request, @Res() res: Response) {
    return new SuccessResponse({}, "hello from logout").send(res);
  }
}

export default AuthController;

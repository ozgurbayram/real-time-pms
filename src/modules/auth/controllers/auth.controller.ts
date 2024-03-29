import { Request, Response } from 'express';
import { Body, JsonController, Post, Req, Res } from 'routing-controllers';
import UserService from '../../user/services/user.service';
import { LoginRequest, RegisterRequest } from '../requests/auth.requests';
import AuthService from '../services/auth.service';

@JsonController('/auth')
class AuthController {
	private authService: AuthService;
	private userService: UserService;

	constructor() {
		this.authService = new AuthService();
		this.userService = new UserService();
	}

  @Post('/login')
	public async login(@Body() body: LoginRequest, @Res() res: Response) {
		const { email, password } = body;

		const data = await this.authService.loginViaPasswordGrant(email, password);

		return res.json({
			data: data,
			message: 'Login successful',
		});
	}

  @Post('/register')
  public async register(
    @Body({ validate: true }) body: RegisterRequest,
    @Res() res: Response,
  ) {
  	const { email, password, password_confirm } = body;

  	const user = await this.userService.createUser({
  		email,
  		password,
  		password_confirm,
  	});

  	const data = await this.authService.loginViaPasswordGrant(
  		user.email,
  		password,
  	);

  	return res.json({
  		data: data,
  		message: 'Registration successful',
  	});
  }

  @Post('/refresh_token')
  public async refreshToken(@Req() req: Request, @Res() res: Response) {
  	const { refresh_token } = req.body;

  	const data = await this.authService.refreshToken(refresh_token);

  	return res.json({
  		data: data,
  		message: 'Token refreshed successfully',
  	});
  }

  @Post('/logout')
  public async logout() {
  	return 'Logout';
  }
}

export default AuthController;

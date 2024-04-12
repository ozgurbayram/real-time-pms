import { User } from '../../user/entities/user.entity';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AccessTokenRepository from '../repositories/access-token.repository';
import AccessToken from '../entities/access-token.entity';
import RefreshToken from '../entities/refresh-token.entity';
import RefreshTokenRepository from '../repositories/refresh-token.repository';

/**
 * Service for generating and verifying user tokens.
 */
class TokenService {
	private accessTokenRepository: AccessTokenRepository;
	private refreshTokenRepository: RefreshTokenRepository;

	constructor() {
		this.accessTokenRepository = new AccessTokenRepository();
		this.refreshTokenRepository = new RefreshTokenRepository();
	}

	/**
   * Generates user tokens.
   * @param user - The user object.
   * @returns An object containing the access token and refresh token.
   */
	public async generateUserTokens(
		user: User,
	): Promise<{ access_token: string; refresh_token: string }> {
		const accessTokenPayload = jwt.sign(
			{
				userId: user.id,
				email: user.email,
			},
			'token-secret',
			{
				expiresIn: process.env.JWT_TTL,
			},
		);

		const _accessToken = new AccessToken(accessTokenPayload, user);

		const access_token = await this.accessTokenRepository.save(_accessToken);

		const refreshTokenPayload = jwt.sign(
			{
				userId: user.id,
				email: user.email,
			},
			'token-secret',
			{
				expiresIn: process.env.JWT_TTL,
			},
		);

		const _refreshToken = new RefreshToken(refreshTokenPayload, access_token);

		const refresh_token = await this.refreshTokenRepository.save(_refreshToken);

		return {
			access_token: access_token.token,
			refresh_token: refresh_token.token,
		};
	}

	/**
   * Verifies an access token.
   * @param token - The token to verify.
   * @returns The user_id token.
   */
	public async verifyAccessToken(accessToken: string) {
		const token = await this.accessTokenRepository.findOneOrFail({
			where: { token: accessToken },
			relations: { user: true },
		});

		if (!token) {
			throw new Error('Invalid token');
		}

		if (token.revoked) {
			throw new Error('Token revoked');
		}

		if (token.expires_at < new Date()) {
			await this.accessTokenRepository.update(token, { revoked: true });

			throw new Error('Token expired');
		}

		return {
			user_id: token.user.id,
		};
	}

	/**
   * Verifies a refresh token.
   * @param token - The token to verify.
   * @returns The decoded token.
   */
	public async verifyRefreshToken(refreshToken: string) {
		const token = await this.refreshTokenRepository.findOneOrFail({
			where: { token: refreshToken },
			relations: { accessToken: true },
		});

		if (!token) {
			throw new Error('Invalid token');
		}

		if (token.revoked) {
			throw new Error('Token revoked');
		}

		return {
			acccess_token: token.accessToken.token,
			refresh_token: token.token,
			user_id: (jwt.decode(token.accessToken.token) as JwtPayload)?.userId,
		};
	}

	/**
   * Revokes a refresh token.
   * @param token - The token to revoke.
   */
	public async revokeRefreshToken(token: string) {
		const refreshToken = await this.refreshTokenRepository.findOneOrFail({
			where: { token },
		});
		refreshToken.revoked = true;

		await this.refreshTokenRepository.save(refreshToken);
	}

	/**
   * Revokes an access token.
   * @param token - The token to revoke.
   */
	public async revokeAccessToken(token: string) {
		const accessToken = await this.accessTokenRepository.findOneOrFail({
			where: { token },
		});

		accessToken.revoked = true;

		await this.accessTokenRepository.save(accessToken);
	}
}

export default TokenService;

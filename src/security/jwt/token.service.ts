import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential, Token } from '@security/model/entity';
import { TokenGenerationException } from '@security/security.exception';
import { JwtService } from '@nestjs/jwt';
import { configManager } from '@common/config';
import { ConfigKey } from '@common/enum';
import { Builder } from 'builder-pattern';
import { RefreshPayload } from '@security/model/payload/refresh.payload';

@Injectable()
export class TokenService {
	private readonly logger = new Logger(TokenService.name);

	constructor(
		@InjectRepository(Token)
		private readonly tokenRepository: Repository<Token>,
		@InjectRepository(Credential)
		private readonly credentialRepository: Repository<Credential>,
		private readonly jwtService: JwtService,
	) {}

	async getTokens(credential: Credential): Promise<Token> {
		try {
			// delete last credential
			await this.tokenRepository.delete({ credential });

			// create the payload for JWTService
			const payload = { sub: credential.credential_id };

			// For security purpose, the hashed key for the token and refreshToken must be  different
			const token = await this.jwtService.signAsync(payload, {
				secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
				expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN),
			});

			const refreshToken = await this.jwtService.signAsync(payload, {
				secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
				expiresIn: configManager.getValue(
					ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN,
				),
			});

			/**
			 * Here we chech if a token with same credential
			 * already exists and update it or insert the new token.
			 * Here the criteria is the credential attached to the token
			 */
			await this.tokenRepository.upsert(
				Builder<Token>()
					.token(token)
					.refreshToken(refreshToken)
					.credential(credential)
					.build(),
				['credential'],
			);

			// We return the token created or updated in database
			return this.tokenRepository.findOneBy({ token: token });
		} catch (e) {
			this.logger.error(e);
			throw new TokenGenerationException();
		}
	}

	/**
	 * Delete the token associated with the credential provided
	 * @param credential
	 */
	async deleteFor(credential: Credential): Promise<void> {
		try {
			await this.tokenRepository.delete({ credential });
		} catch (e) {
			this.logger.error(e);
			throw new TokenGenerationException();
		}
	}

	async refresh(payload: RefreshPayload): Promise<Token> {
		try {
			/**
			 * Verify the refresh token is encrypted with our refresh token secret
			 * and extract info from the token
			 */
			const id = this.jwtService.verify(payload.refresh, {
				secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
			}).sub;

			// Check if a credential has the id
			const credential = await this.credentialRepository.findOneBy({
				credential_id: id,
			});

			// Return new tokens
			return await this.getTokens(credential);
		} catch (e) {
			this.logger.error(e);
			throw new TokenGenerationException();
		}
	}
}

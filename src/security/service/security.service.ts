/**
 * This service will handle credential persistence and validation.
 *
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from '@security/jwt/token.service';
import { Credential, Token } from '@security/model/entity';
import { isNil } from 'lodash';
import {
	CredentialDeletedException,
	SignOutException,
	SignUpException,
	UnauthorizedOperationException,
	UserAlreadyExistsException,
	UserNotFoundException,
} from '@security/security.exception';
import { SignInPayload } from '@security/model/payload/sign-in.payload';
import {
	comparePassword,
	encryptPassword,
} from '@common/utils/password.decoder';
import { SignUpPayload } from '@security/model/payload/sign-up.payload';
import { Builder } from 'builder-pattern';
import { RefreshPayload } from '@security/model/payload/refresh.payload';

@Injectable()
export class SecurityService {
	private readonly logger = new Logger(SecurityService.name);

	constructor(
		@InjectRepository(Credential)
		private readonly credentialRepository: Repository<Credential>,
		private readonly tokenService: TokenService,
	) {}

	/**
	 * Retrieve credential details
	 * @param id Credential ID
	 */
	async detail(id: string): Promise<Credential> {
		const result = await this.credentialRepository.findOneBy({
			credential_id: id,
		});

		if (!isNil(result)) {
			return result;
		}

		throw new UserNotFoundException();
	}

	async signIn(
		payload: SignInPayload,
		isAdmin: boolean,
	): Promise<Token | null> {
		let result = null;

		if (payload.useProvider) {
			if (!isNil(payload.googleHash) && payload.googleHash.length > 0) {
				result = await this.credentialRepository.findOneBy({
					googleHash: payload.googleHash,
					isAdmin: isAdmin,
				});
			} else {
				result = await this.credentialRepository.findOneBy({
					euroCoreHash: payload.euroCoreHash,
					isAdmin: isAdmin,
				});
			}
		} else {
			result = await this.credentialRepository.findOneBy({
				email: payload.email,
				isAdmin: isAdmin,
			});
		}

		if (
			!isNil(result) &&
			(payload.useProvider ||
				(await comparePassword(payload.password, result.password)))
		) {
			return this.tokenService.getTokens(result);
		}

		throw new UserNotFoundException();
	}

	async signUp(payload: SignUpPayload): Promise<Token | null> {
		const result: Credential | null = await this.credentialRepository.findOneBy(
			{
				email: payload.email,
			},
		);

		if (!isNil(result)) {
			throw new UserAlreadyExistsException();
		}

		try {
			const encryptedPassword =
				!(payload.euroCoreHash && payload.euroCoreHash.length === 0) ||
				!(payload.googleHash && payload.googleHash.length === 0)
					? await encryptPassword(payload.password)
					: '';

			// Instead of returning the newly created user
			// We only save the new user and return a Token object
			await this.credentialRepository.save(
				Builder<Credential>()
					.email(payload.email)
					.password(encryptedPassword)
					.googleHash(payload.googleHash)
					.euroCoreHash(payload.euroCoreHash)
					.build(),
			);

			// TODO: Check identity with Euro-core identity provider before sign-in.
			// TODO: Check identity with Google provider before sign-in.

			const signInPayload: SignInPayload = {
				...payload,
				useProvider: !(
					isNil(payload.euroCoreHash) && isNil(payload.googleHash)
				),
			};

			// TODO: Check if user is admin
			const isAdmin = false;

			return this.signIn(signInPayload, isAdmin);
		} catch (e) {
			this.logger.error(e);
			throw new SignUpException();
		}
	}

	async refresh(payload: RefreshPayload): Promise<Token | null> {
		return this.tokenService.refresh(payload);
	}

	async delete(id: string, user: Credential): Promise<void> {
		try {
			// Retrieve credential details to be deleted
			const detail = await this.detail(id);

			// Check if user is admin
			if (!user.isAdmin) {
				throw new UnauthorizedOperationException();
			}

			await this.tokenService.deleteFor(detail);
			await this.credentialRepository.remove(detail);
		} catch (e) {
			this.logger.error(e);
			throw new CredentialDeletedException();
		}
	}

	async signOut(user: Credential): Promise<void> {
		try {
			await this.tokenService.deleteFor(user);
		} catch (e) {
			this.logger.error(e);
			throw new SignOutException();
		}
	}
}

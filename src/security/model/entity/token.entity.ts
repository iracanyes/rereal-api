import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { tokenPkGenerator } from '@common/config';
import { Credential } from './credential.entity';

@Entity()
export class Token {
	@PrimaryColumn('varchar', {
		length: 60,
		default: () => `'${tokenPkGenerator()}'`,
	})
	token_id: string;

	@Column({ nullable: false })
	token: string;

	@Column({ nullable: false })
	refreshToken: string;

	@OneToOne(() => Credential, { eager: true })
	@JoinColumn({ name: 'credential_id' })
	credential: Credential;
}
